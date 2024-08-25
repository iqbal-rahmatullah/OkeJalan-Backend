import { Router } from "express"
import authMiddleware from "../middleware/Authenticate.js"
import ChatController from "../controllers/ChatController.js"
const chatRouter = Router()

chatRouter.get("/", (req, res) => {
  res.json({ message: "OkeJalan chat service" })
})
chatRouter.get("/open", authMiddleware, ChatController.openChat)
chatRouter.post("/send", authMiddleware, ChatController.sendMessage)

export default chatRouter
