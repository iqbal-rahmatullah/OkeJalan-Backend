import { parse } from "date-fns"
import prisma from "../data/db.config.js"

class ChatController {
  static async openChat(req, res) {
    try {
      const { transaction_id } = req.body
      const userId = req.user.id

      const checkChat = await prisma.chat.findFirst({
        where: {
          transaction_id: parseInt(transaction_id),
        },
        include: {
          chatDetails: true,
        },
      })

      if (!checkChat) {
        const createChat = await prisma.chat.create({
          data: {
            transaction_id: parseInt(transaction_id),
          },
        })

        return res.status(200).json({ error: false, data: createChat })
      }

      const nonReceiverChatDetailsCount = checkChat.chatDetails
        ? checkChat.chatDetails.filter((detail) => detail.sender_id !== userId)
            .length
        : 0

      checkChat.chatDetails = checkChat.chatDetails.map((detail) => ({
        ...detail,
        isMe: detail.sender_id === userId,
      }))

      checkChat.jumlahPesan = nonReceiverChatDetailsCount

      return res.status(200).json({ error: false, data: checkChat })
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  }

  static async sendMessage(req, res) {
    try {
      const { transaction_id, message, receiver_id } = req.body

      const checkChat = await prisma.chat.findFirst({
        where: {
          transaction_id: parseInt(transaction_id),
        },
      })

      if (!checkChat) {
        return res.status(404).json({ error: true, message: "Chat not found" })
      }

      const createChatDetail = await prisma.chatDetail.create({
        data: {
          chat_id: checkChat.id,
          message,
          receiver_id: parseInt(receiver_id),
          sender_id: req.user.id,
        },
      })

      return res.status(200).json({ error: false, data: createChatDetail })
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  }
}

export default ChatController
