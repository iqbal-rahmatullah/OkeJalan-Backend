import prisma from "../data/db.config.js"

class JadwalController {
  static async getJadwalAngkotByAsal(req, res) {
    try {
      const { asal } = req.body
      if (!asal) {
        return res
          .status(400)
          .json({ error: true, message: "Parameter asal is required" })
      }

      const angkot = await prisma.angkot.findMany({
        include: {
          rute: {
            where: {
              alamat: asal,
            },
            select: {
              jam_tiba: true,
            },
          },
        },
      })

      if (angkot.length == 0) {
        return res.status(404).json({ error: true, message: "Data not found" })
      }

      const filteredAngkot = angkot.filter((angkot) => {
        return angkot.rute.length > 0
      })

      return res.json({
        message: "Successfully get jadwal",
        data: filteredAngkot,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  }
}

export default JadwalController
