import axios from "axios"
import prisma from "../data/db.config.js"
import { format } from "date-fns"
import { id, tr } from "date-fns/locale"

class TransactionController {
  static async getTransaction(req, res) {
    try {
      const { status } = req.params

      const response = await prisma.transaction.findMany({
        where: {
          user_id: req.user.id,
          OR:
            status === "pending"
              ? [{ status: "pending" }, { status: "on_going" }]
              : [{ status }],
        },
        include: {
          asal: true,
          tujuan: true,
          angkot: {
            include: {
              sopir: true,
            },
          },
        },
      })

      if (response.length == 0) {
        return res.status(404).json({
          message: "Data not found",
          data: response,
        })
      }

      const finalResponse = response.map((item) => {
        return {
          ...item,
          tanggal: format(
            new Date(item.tanggal.getTime() - 7 * 60 * 60 * 1000),
            "dd MMMM yyyy, HH:mm",
            { locale: id }
          ),
        }
      })

      return res.status(200).json({
        message: "Successfully get data",
        data: finalResponse,
      })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }

  static async getPrice(req, res) {
    try {
      const { originLat, originLng, destinationLng, destinationLat } = req.body

      const calculate = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destinationLat},${destinationLng}&key=${process.env.GOOGLE_MAP_KEY}`
      )
      const distance = calculate.data.rows[0].elements[0].distance.value
      const distanceAsString = calculate.data.rows[0].elements[0].distance.text
      const durationAsSecond = calculate.data.rows[0].elements[0].duration.value
      const durationAsMinute = calculate.data.rows[0].elements[0].duration.text

      const price = 4000 * (distance / 1000)
      const fixPrice = Math.ceil(price / 1000) * 1000

      return res.status(200).json({
        message: "Successfully get price",
        data: {
          distance,
          distanceAsString,
          durationAsSecond,
          durationAsMinute,
          price: fixPrice,
        },
      })
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  }

  static async createTransaction(req, res) {
    try {
      const user_id = req.user.id
      const { angkot_id, tujuan_id, asal_id, price, date } = req.body

      const user = await prisma.users.findFirst({
        where: {
          id: user_id,
        },
      })

      if (user.balance < parseInt(price)) {
        return res.status(400).json({
          error: true,
          data: {
            balance: user.balance,
            price: parseInt(price),
          },
          message: {
            balance: "Insufficient balance",
          },
        })
      }

      console.log(date)

      const response = await prisma.transaction.create({
        data: {
          user_id,
          angkot_id: parseInt(angkot_id),
          tujuan_id: parseInt(tujuan_id),
          asal_id: parseInt(asal_id),
          price: parseInt(price),
          tanggal: new Date(date),
        },
      })

      await prisma.users.update({
        where: {
          id: user_id,
        },
        data: {
          balance: user.balance - parseInt(price),
        },
      })
      return res.status(200).json({
        message: "Successfully create transaction",
        data: response,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  }

  static async getStatusTransaction(req, res) {
    try {
      const { id } = req.params

      const response = await prisma.transaction.findFirst({
        where: {
          id: parseInt(id),
        },
        select: {
          status: true,
        },
      })

      if (response.length == 0) {
        return res.status(404).json({
          message: "Data not found",
          data: response,
        })
      }

      return res.status(200).json({
        message: "Successfully get data",
        data: response,
      })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }

  static async getPenghasilan(req, res) {
    try {
      const { id } = req.user
      const angkot = await prisma.angkot.findFirst({
        where: {
          id_sopir: id,
        },
        select: {
          id: true,
        },
      })

      if (!angkot) {
        return res.status(200).json({
          message: "Successfully get data",
          data: {
            penghasilan: 0,
          },
        })
      }

      const transaction = await prisma.transaction.findMany({
        where: {
          angkot_id: angkot.id,
          status: "done",
        },
        select: {
          price: true,
        },
      })

      const total = transaction.reduce((acc, curr) => {
        return acc + curr.price
      }, 0)

      return res.status(200).json({
        message: "Successfully get data",
        data: {
          penghasilan: total,
        },
      })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }
}

export default TransactionController
