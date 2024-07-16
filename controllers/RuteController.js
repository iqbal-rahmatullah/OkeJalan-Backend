import prisma from "../data/db.config.js"

class RuteController {
  static async getAllRute(req, res) {
    try {
      const response = await prisma.rute.findMany()
      const filteredResponse = response.filter(
        (v, i, a) => a.findIndex((t) => t.alamat === v.alamat) === i
      )

      return res.status(200).json({
        message: "Successfully get all rute",
        data: filteredResponse,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  }

  static async getRuteAngkot(req, res) {
    try {
      let response = await prisma.angkot.findMany({
        include: {
          rute: true,
        },
      })
      response = response.map((v) => {
        const rute_awal = v.rute.length > 0 ? v.rute[0].alamat : null
        const rute_akhir =
          v.rute.length > 0 ? v.rute[v.rute.length - 1].alamat : null
        return {
          ...v,
          rute_awal,
          rute_akhir,
        }
      })

      return res.status(200).json({
        message: "Successfully get rute angkot",
        data: response,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  }
}

export default RuteController
