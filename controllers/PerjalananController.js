import moment from "moment-timezone"
import prisma from "../data/db.config.js"
import formattedPerjalanan from "../utils/PerjalananFormatter.js"
import { endOfDay, startOfDay } from "date-fns"

class PerjalananController {
  static async getPerjalananHariIni(req, res) {
    try {
      const { id_angkot } = req.params

      const ruteBerangkat = await prisma.rute.findMany({
        where: {
          id_angkot: parseInt(id_angkot),
          tipe: "berangkat",
        },
      })
      const rutePulang = await prisma.rute.findMany({
        where: {
          id_angkot: parseInt(id_angkot),
          tipe: "balik",
        },
      })

      if (ruteBerangkat.length === 0 && rutePulang.length === 0) {
        return res.status(404).json({
          error: true,
          message: "Rute angkot tidak ditemukan",
        })
      }

      const finalRuteBerangkat = await formattedPerjalanan(
        ruteBerangkat,
        id_angkot
      )
      const finalRutePulang = await formattedPerjalanan(rutePulang, id_angkot)

      const data = []
      if (ruteBerangkat.some((rute) => !rute.is_done)) {
        const finalRuteBerangkat = await formattedPerjalanan(
          ruteBerangkat,
          id_angkot
        )
        if (finalRuteBerangkat) data.push(finalRuteBerangkat)
      }

      if (rutePulang.some((rute) => !rute.is_done)) {
        const finalRutePulang = await formattedPerjalanan(rutePulang, id_angkot)
        if (finalRutePulang) data.push(finalRutePulang)
      }

      return res.status(200).json({
        message: "Successfully get perjalanan hari ini",
        data: data.length ? data : null,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }

  static async selesai(req, res) {
    try {
      const { angkot_id, tipe } = req.body
      const rute = await prisma.rute.findMany({
        where: {
          id_angkot: parseInt(angkot_id),
          tipe,
          is_done: false,
        },
      })

      if (rute.length > 0) {
        return res.status(400).json({
          error: true,
          message: {
            rute: "Ada rute yang belum selesai",
          },
        })
      }

      const now = new Date()
      const timeZoneOffset = 7 * 60 * 60 * 1000

      const startOfToday = new Date(startOfDay(now).getTime() + timeZoneOffset)

      const endOfToday = new Date(endOfDay(now).getTime() + timeZoneOffset)

      const transactionsToUpdate = await prisma.transaction.findMany({
        where: {
          angkot_id: parseInt(angkot_id),
          asal: {
            tipe: tipe,
          },
          tanggal: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
      })

      await prisma.transaction.updateMany({
        where: {
          angkot_id: parseInt(angkot_id),
          asal: {
            tipe: tipe,
          },
          tanggal: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
        data: {
          status: "done",
        },
      })

      const increaseBalancePromises = transactionsToUpdate.map(
        (transaction) => {
          return prisma.users.update({
            where: {
              id: req.user.id,
            },
            data: {
              balance: {
                increment: transaction.price,
              },
            },
          })
        }
      )

      const increaseBalance = await Promise.all(increaseBalancePromises)

      return res.status(200).json({
        message: "Perjalanan berhasil diselesaikan",
        data: {
          transactions: transactionsToUpdate,
          increaseBalance,
        },
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }

  static async berhentiDarurat(req, res) {
    try {
      const { angkot_id, tipe } = req.body

      const ruteUpdate = await prisma.rute.updateMany({
        where: {
          id_angkot: parseInt(angkot_id),
          tipe,
          is_done: false,
        },
        data: {
          is_done: true,
        },
      })

      const now = new Date()
      const timeZoneOffset = 7 * 60 * 60 * 1000

      const startOfToday = new Date(startOfDay(now).getTime() + timeZoneOffset)

      const endOfToday = new Date(endOfDay(now).getTime() + timeZoneOffset)

      await prisma.transaction.updateMany({
        where: {
          angkot_id: parseInt(angkot_id),
          asal: {
            tipe: tipe,
          },
          tanggal: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
        data: {
          status: "done",
        },
      })

      return res.status(200).json({
        message: "Perjalanan berhasil diselesaikan",
        data: {
          ruteUpdate,
        },
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }

  static async getLocationDriver(req, res) {
    try {
      const response = await prisma.users.findFirst({
        where: {
          id: parseInt(req.params.id_driver),
        },
        select: {
          lat: true,
          long: true,
        },
      })

      if (response.lat === null || response.long === null) {
        return res.status(404).json({
          error: true,
          message: "Driver belum memulai perjalanan",
        })
      }

      return res.status(200).json({
        message: "Successfully get driver location",
        data: response,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }

  static async getPenumpang(req, res) {
    try {
      const { angkot_id, tipe } = req.body
      const response = await prisma.angkot.findMany({
        where: {
          id: parseInt(angkot_id),
        },
        include: {
          rute: {
            where: {
              tipe: tipe,
            },
          },
        },
      })

      if (response.length === 0) {
        return res.status(404).json({
          error: true,
          message: "Perjalanan angkot tidak ditemukan",
        })
      }

      const now = new Date()
      const timeZoneOffset = 7 * 60 * 60 * 1000

      const startOfToday = new Date(startOfDay(now).getTime() + timeZoneOffset)

      const endOfToday = new Date(endOfDay(now).getTime() + timeZoneOffset)

      const transactions = await prisma.transaction.findMany({
        where: {
          angkot_id: parseInt(angkot_id),
          tanggal: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
        include: {
          user: true,
        },
      })

      const combinedData = response.map((angkot) => {
        const ruteDenganTransaksi = angkot.rute.map((rute) => {
          const transaksiRute = transactions.filter(
            (transaction) => transaction.asal_id === rute.id
          )

          return {
            ...rute,
            transactions: transaksiRute,
            jumlahPenumpang: transaksiRute.length,
          }
        })

        return {
          ...angkot,
          rute: ruteDenganTransaksi,
        }
      })

      return res.json({
        message: "Successfully get penumpang",
        data: combinedData,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }
}

export default PerjalananController
