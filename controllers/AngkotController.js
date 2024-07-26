import prisma from "../data/db.config.js"
import path from "path"

class AngkotController {
  static async searchAngkot(req, res) {
    try {
      const { lokasi_awal, tujuan } = req.body

      const response = await prisma.angkot.findMany({
        where: {
          rute: {
            some: {
              alamat: {
                in: [lokasi_awal, tujuan],
              },
            },
          },
        },
        include: {
          rute: true,
          fasilitas: true,
          sopir: true,
        },
      })

      // Filter rute berdasarkan lokasi_awal dan tujuan
      const matchedAngkots = response.filter((angkot) => {
        const startIndex = angkot.rute.findIndex(
          (rute) => rute.alamat == lokasi_awal
        )
        const endIndex = angkot.rute.findIndex((rute) => rute.alamat == tujuan)
        return startIndex !== -1 && endIndex !== -1 && endIndex > startIndex
      })

      if (matchedAngkots.length == 0) {
        return res.status(404).json({
          message: "Angkot not found",
          data: {
            lokasi_awal,
            tujuan,
          },
        })
      }

      matchedAngkots.forEach((angkot) => {
        angkot.rute = angkot.rute.map((rute) => ({
          ...rute,
          isLokasiAwal: rute.alamat === lokasi_awal ? true : undefined,
          isTujuan: rute.alamat === tujuan ? true : undefined,
        }))
      })

      return res.status(200).json({
        message: "Successfully search angkot",
        data: {
          tujuan,
          lokasi_awal,
          angkot: matchedAngkots,
        },
      })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  }

  static async getRatingAngkot(req, res) {
    try {
      const { id } = req.params
      const response = await prisma.angkot.findFirst({
        where: {
          id: parseInt(id),
        },
        include: {
          rating: true,
        },
      })

      if (!response) {
        return res.status(404).json({
          message: "Angkot not found",
          data: {
            id,
          },
        })
      }
      if (response.rating.length == 0) {
        return res.status(404).json({
          message: "Rating not found",
          data: {
            id,
            rating: {
              rating_fasilitas: 0,
              rating_pelayanan: 0,
            },
          },
        })
      }

      const totalRatingFasilitas = response.rating.reduce(
        (acc, rating) => acc + rating.rating_fasilitas,
        0
      )
      const totalRatingPelayanan = response.rating.reduce(
        (acc, rating) => acc + rating.rating_pelayanan,
        0
      )

      return res.status(200).json({
        message: "Successfully get rating angkot",
        data: {
          rating: {
            rating_fasilitas: totalRatingFasilitas / response.rating.length,
            rating_pelayanan: totalRatingPelayanan / response.rating.length,
          },
          angkot: response,
        },
      })
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  }

  static getImageAngkot(req, res) {
    try {
      const filename = req.params.file_name
      const filepath = path.join(
        process.cwd(),
        "storage/angkot_images",
        filename
      )
      res.sendFile(filepath)
    } catch (error) {
      console.error("Error sending image:", error)
      res.status(500).json({ error: true, message: "Internal server error" })
    }
  }

  static async getFavoriteAngkot(req, res) {
    try {
      let response = await prisma.favorite.findMany({
        where: {
          user_id: req.user.id,
        },
        include: {
          angkot: {
            include: {
              rute: true,
            },
          },
        },
      })

      if (response.length == 0) {
        return res.status(404).json({
          message: "Favorite angkot not found",
          data: response,
        })
      }

      response = response.map((v) => {
        const rute_awal =
          v.angkot.rute.length > 0 ? v.angkot.rute[0].alamat : null
        const rute_akhir =
          v.angkot.rute.length > 0
            ? v.angkot.rute[v.angkot.rute.length - 1].alamat
            : null
        return {
          ...v,
          rute_awal,
          rute_akhir,
        }
      })

      return res.status(200).json({
        message: "Successfully get favorite angkot",
        data: response,
      })
    } catch (error) {
      console.error("Error sending image:", error)
      res.status(500).json({ error: true, message: "Internal server error" })
    }
  }
}

export default AngkotController
