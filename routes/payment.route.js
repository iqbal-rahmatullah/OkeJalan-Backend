import { Router } from "express"
import AngkotController from "../controllers/AngkotController.js"
import authMiddleware from "../middleware/Authenticate.js"
const paymentRouter = Router()

paymentRouter.get("/", (req, res) => {
  res.json({ message: "OkeJalan payment service" })
})

export default paymentRouter
