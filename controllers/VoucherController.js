import { parse } from "date-fns"
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

      const checkUserVoucher = await prisma.userVoucher.findMany({
        where: {
          user_id: req.user.id,
        },
      })

      const finalResponse = response.filter((v) => {
        const checkVoucher = checkUserVoucher.findIndex(
          (uv) => uv.voucher_id === v.id
        )
        if (checkVoucher === -1) {
          return v
        }
      })

      return res.status(200).json({
        message: "Successfully get all voucher",
        data: finalResponse,
      })
    } catch (error) {
      return res.status(500).json({
        message:
          error.message || "Some error occurred while retrieving voucher",
      })
    }
  }

  static async claimVoucher(req, res) {
    try {
      const { voucher_id } = req.body

      const voucher = await prisma.voucher.findMany()
      const checkVoucher = voucher.findIndex(
        (v) => v.id === parseInt(voucher_id)
      )
      const voucherAlredyClaimed = await await prisma.userVoucher.findMany({
        where: {
          user_id: req.user.id,
          voucher_id: parseInt(voucher_id),
        },
      })

      if (checkVoucher === -1 || voucherAlredyClaimed.length > 0) {
        return res.status(400).json({
          error: true,
          message: {
            voucher: "Voucher not found/alredy claimed",
          },
        })
      }

      const response = await prisma.userVoucher.create({
        data: {
          user_id: req.user.id,
          voucher_id: parseInt(voucher_id),
        },
      })

      return res.status(200).json({
        message: "Successfully claim voucher",
        data: response,
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Some error occurred while claiming voucher",
      })
    }
  }
}

export default VoucherController
