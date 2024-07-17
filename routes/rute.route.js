import { Router } from "express"
import RuteController from "../controllers/RuteController.js"
import authMiddleware from "../middleware/Authenticate.js"
const ruteRouter = Router()

ruteRouter.get("/", (req, res) => {
  res.json({ message: "OkeJalan rute service" })
})
ruteRouter.get("/get-all", authMiddleware, RuteController.getAllRute)
ruteRouter.get("/get-rute-angkot", authMiddleware, RuteController.getRuteAngkot)

export default ruteRouter
