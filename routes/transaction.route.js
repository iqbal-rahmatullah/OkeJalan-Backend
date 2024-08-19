import { Router } from "express"
import authMiddleware from "../middleware/Authenticate.js"
import TransactionController from "../controllers/TransactionController.js"
import authDriverMiddleware from "../middleware/DriverAuthenticate.js"
const transactionRouter = Router()

transactionRouter.get("/", (req, res) => {
  res.json({ message: "OkeJalan transaction service" })
})
transactionRouter.get(
  "/all/:status",
  authMiddleware,
  TransactionController.getTransaction
)
transactionRouter.get(
  "/get-price",
  authMiddleware,
  TransactionController.getPrice
)
transactionRouter.post(
  "/add-transaction",
  authMiddleware,
  TransactionController.createTransaction
)
transactionRouter.get(
  "/get-transaction-status/:id",
  authMiddleware,
  TransactionController.getStatusTransaction
)
transactionRouter.get(
  "/get-penghasilan",
  authDriverMiddleware,
  TransactionController.getPenghasilan
)

export default transactionRouter
