import axios from "axios"
import prisma from "../data/db.config.js"

class TransactionController {
  static async getPrice(req, res) {
    try {
      const { originLat, originLng, destinationLng, destinationLat } = req.body

      const calculate = await axios.get(
        `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destinationLat},${destinationLng}&key=${process.env.DISTANCE_MATRIX_API_KEY}`
      )
      const distance = calculate.data.rows[0].elements[0].distance.value
      const distanceAsString = calculate.data.rows[0].elements[0].distance.text
      const durationAsSecond = calculate.data.rows[0].elements[0].duration.value
      const durationAsMinute = calculate.data.rows[0].elements[0].duration.text

      const price = 4000 * (distance / 1000)

      return res.status(200).json({
        message: "Successfully get price",
        data: {
          distance,
          distanceAsString,
          durationAsSecond,
          durationAsMinute,
          price,
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
      const { angkot_id, tujuan_id, asal_id, price } = req.body

      const response = await prisma.transaction.create({
        data: {
          user_id,
          angkot_id: parseInt(angkot_id),
          tujuan_id: parseInt(tujuan_id),
          asal_id: parseInt(asal_id),
          price: parseInt(price),
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
}

export default TransactionController
