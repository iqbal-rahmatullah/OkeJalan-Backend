import { parse } from "dotenv"
import snap from "../data/midtrans.config.js"
import prisma from "../data/db.config.js"
import { format } from "date-fns"

class PaymentController {
  static async createPayment(req, res) {
    try {
      const { amount } = req.body

      if (!amount) {
        return res.status(400).json({
          error: true,
          message: {
            amount: "Amount is required",
          },
        })
      }

      const orderId = `OJ-${Date.now()}`

      const response = await snap.charge({
        payment_type: "gopay",
        transaction_details: {
          gross_amount: amount,
          order_id: orderId,
        },
      })

      const transaction = await prisma.payment.create({
        data: {
          user_id: req.user.id,
          amount: parseInt(amount),
          id: orderId,
          snap_token: response.actions[0].url,
        },
      })

      res.status(200).json({
        error: false,
        message: "Payment created successfully",
        data: transaction,
      })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }

  static async callback(req, res) {
    try {
      const { order_id, transaction_status, fraud_status } = req.body

      let response
      if (transaction_status == "capture") {
        if (fraudStatus == "challenge") {
          response = await prisma.payment.update({
            where: {
              id: order_id,
            },
            data: {
              status: "failed",
            },
          })
        } else if (fraud_status == "accept") {
          response = await prisma.payment.update({
            where: {
              id: order_id,
            },
            data: {
              status: "success",
            },
          })
        }
      } else if (transaction_status == "settlement") {
        response = await prisma.payment.update({
          where: {
            id: order_id,
          },
          data: {
            status: "success",
          },
        })
      } else if (
        transaction_status == "deny" ||
        transaction_status == "cancel" ||
        transaction_status == "expire"
      ) {
        response = await prisma.payment.update({
          where: {
            id: order_id,
          },
          data: {
            status: "failed",
          },
        })
      } else if (transaction_status == "pending") {
        response = await prisma.payment.findFirst({
          where: {
            id: order_id,
          },
        })
      }

      if (response.status == "success") {
        await prisma.users.update({
          where: {
            id: response.user_id,
          },
          data: {
            balance: {
              increment: response.amount,
            },
          },
        })
      }

      res.status(200).json({ status: "success", data: response })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }

  static async getPayment(req, res) {
    try {
      const response = await prisma.payment.findMany({
        where: {
          user_id: req.user.id,
        },
      })

      if (response.length == 0) {
        return res.status(404).json({
          error: true,
          message: "No payment found",
          data: response,
        })
      }

      const finalResponse = response.map((payment) => {
        return {
          ...payment,
          tanggal: format(new Date(payment.created_at), "dd MMMM yyyy"),
        }
      })

      return res.status(200).json({
        error: false,
        data: finalResponse.reverse(),
      })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }

  static async deletePayment(req, res) {
    try {
      const response = await prisma.payment.delete({
        where: {
          snap_token: req.params.snap,
        },
      })

      return res.status(200).json({
        error: false,
        data: response,
      })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }
}

export default PaymentController
