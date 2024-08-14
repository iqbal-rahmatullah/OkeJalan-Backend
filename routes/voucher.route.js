import { Router } from "express"
import authMiddleware from "../middleware/Authenticate.js"
import VoucherController from "../controllers/VoucherController.js"
const voucherRouter = Router()

voucherRouter.get("/", (req, res) => {
  res.json({ message: "OkeJalan voucher service" })
})
voucherRouter.get("/all", authMiddleware, VoucherController.getAllVouhcer)
voucherRouter.post("/claim", authMiddleware, VoucherController.claimVoucher)

export default voucherRouter
