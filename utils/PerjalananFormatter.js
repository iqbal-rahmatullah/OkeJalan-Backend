import prisma from "../data/db.config.js"
import getDifferenceInMinutes from "./DifferentTime.js"

const formattedPerjalanan = async (perjalanan, id_angkot) => {
  if (perjalanan.length > 0) {
    const now = new Date()
    let startOfDay = new Date(
      now.setHours(
        parseInt(perjalanan[0].jam_tiba.split(":")[0]),
        parseInt(perjalanan[0].jam_tiba.split(":")[1]),
        0,
        0
      )
    )
    let endOfDay = new Date(
      now.setHours(
        parseInt(perjalanan[perjalanan.length - 1].jam_tiba.split(":")[0]),
        parseInt(perjalanan[perjalanan.length - 1].jam_tiba.split(":")[1]),
        0,
        0
      )
    )

    let transactions = await prisma.transaction.findMany({
      where: {
        angkot_id: parseInt(id_angkot),
        tanggal: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    })

    const finalperjalanan = {
      jumlahPenumpang: transactions.length,
      waktu: getDifferenceInMinutes(perjalanan[0].jam_tiba),
      perjalanan,
    }

    return finalperjalanan
  }
  return null
}

export default formattedPerjalanan
