import { endOfDay, endOfToday, startOfDay, startOfToday } from "date-fns"
import prisma from "../data/db.config.js"
import getDifferenceInMinutes from "./DifferentTime.js"
import moment from "moment-timezone"

const formattedPerjalanan = async (perjalanan, id_angkot) => {
  if (perjalanan.length > 0) {
    const now = new Date()
    const timeZoneOffset = 7 * 60 * 60 * 1000

    const startOfToday = new Date(startOfDay(now).getTime() + timeZoneOffset)
    // console.log("Start of Today:", startOfToday)

    const endOfToday = new Date(endOfDay(now).getTime() + timeZoneOffset)
    // console.log("End of Today:", endOfToday)

    let transactions = await prisma.transaction.findMany({
      where: {
        angkot_id: parseInt(id_angkot),
        tanggal: {
          gte: startOfToday,
          lte: endOfToday,
        },
        asal: {
          tipe: perjalanan[0].tipe,
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
