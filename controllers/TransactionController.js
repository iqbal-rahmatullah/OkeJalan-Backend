import axios from "axios"

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
}

const calcCrow = (lat1, lon1, lat2, lon2) => {
  var R = 6371 // km
  var dLat = toRad(lat2 - lat1)
  var dLon = toRad(lon2 - lon1)
  var lat1 = toRad(lat1)
  var lat2 = toRad(lat2)

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d
}

const toRad = (Value) => {
  return (Value * Math.PI) / 180
}

export default TransactionController
