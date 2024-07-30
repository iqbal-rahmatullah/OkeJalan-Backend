import prisma from "../data/db.config.js"
import formattedPerjalanan from "../utils/PerjalananFormatter.js"

class PerjalananController {
  static async getPerjalananHariIni(req, res) {
    try {
      const { id_angkot } = req.params

      const ruteBerangkat = await prisma.rute.findMany({
        where: {
          id_angkot: parseInt(id_angkot),
          tipe: "berangkat",
          is_done: false,
        },
      })
      const rutePulang = await prisma.rute.findMany({
        where: {
          id_angkot: parseInt(id_angkot),
          tipe: "balik",
          is_done: false,
        },
      })

      if (ruteBerangkat.length === 0 && rutePulang.length === 0) {
        return res.status(404).json({
          error: true,
          message: "Rute angkot tidak ditemukan",
        })
      }

      //Get jumlah penumpang
      const finalRuteBerangkat = await formattedPerjalanan(
        ruteBerangkat,
        id_angkot
      )
      const finalRutePulang = await formattedPerjalanan(rutePulang, id_angkot)

      const data = []
      if (finalRuteBerangkat) data.push(finalRuteBerangkat)
      if (finalRutePulang) data.push(finalRutePulang)

      return res.status(200).json({
        message: "Successfully get perjalanan hari ini",
        data: data.length ? data : null, // Kirim data atau null jika kosong
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
