import { Router } from "express"
import authMiddleware from "../middleware/Authenticate.js"
import PaymentController from "../controllers/PaymentController.js"

const paymentRouter = Router()

paymentRouter.get("/", (req, res) => {
  res.json({ message: "OkeJalan payment service" })
})
paymentRouter.post("/create", authMiddleware, PaymentController.createPayment)
paymentRouter.post("/callback", PaymentController.callback)
paymentRouter.get("/all-payment", authMiddleware, PaymentController.getPayment)
paymentRouter.delete(
  "/delete/:snap",
  authMiddleware,
  PaymentController.deletePayment
)

export default paymentRouter
