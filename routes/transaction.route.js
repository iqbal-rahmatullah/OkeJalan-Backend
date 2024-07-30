import { Router } from "express"
import authMiddleware from "../middleware/Authenticate.js"
import TransactionController from "../controllers/TransactionController.js"
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

export default transactionRouter
