import { Router } from "express"
import AngkotController from "../controllers/AngkotController.js"
import authMiddleware from "../middleware/Authenticate.js"
const voucherRouter = Router()

voucherRouter.get("/", (req, res) => {
  res.json({ message: "OkeJalan voucher service" })
})
voucherRouter.get("/all")

export default voucherRouter
