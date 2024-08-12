import prisma from "../data/db.config.js"

class VoucherController {
  static async getAllVouhcer(req, res) {
    try {
      const response = await prisma.voucher.findMany({
        where: {
          is_active: true,
        },
      })

      if (response.length === 0) {
        return res.status(404).json({
          message: "Voucher not found",
        })
      }

      return res.status(200).json({
        message: "Successfully get all voucher",
        data: response,
      })
    } catch (error) {
      return res.status(500).json({
        message:
          error.message || "Some error occurred while retrieving voucher",
      })
    }
  }
}
