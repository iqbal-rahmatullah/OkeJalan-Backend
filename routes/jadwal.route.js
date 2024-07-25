import { Router } from "express"
import authMiddleware from "../middleware/Authenticate.js"
import JadwalController from "../controllers/JadwalController.js"
const jadwalRouter = Router()

jadwalRouter.get("/", (req, res) => {
  res.json({ message: "OkeJalan jadwal service" })
})
jadwalRouter.get(
  "/get-angkot",
  authMiddleware,
  JadwalController.getJadwalAngkotByAsal
)

export default jadwalRouter
