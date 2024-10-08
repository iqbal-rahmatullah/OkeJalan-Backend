import { Router } from "express"
import authDriverMiddleware from "../middleware/DriverAuthenticate.js"
import PerjalananController from "../controllers/PerjalananController.js"
import authMiddleware from "../middleware/Authenticate.js"

const perjalananRouter = Router()

perjalananRouter.get("/", (req, res) => {
  res.json({ message: "OkeJalan perjalanan service" })
})
perjalananRouter.get(
  "/hari-ini/:id_angkot",
  authDriverMiddleware,
  PerjalananController.getPerjalananHariIni
)

perjalananRouter.get(
  "/location_driver/:id_driver",
  authMiddleware,
  PerjalananController.getLocationDriver
)

perjalananRouter.get(
  "/get-penumpang",
  authDriverMiddleware,
  PerjalananController.getPenumpang
)

perjalananRouter.post(
  "/selesai",
  authDriverMiddleware,
  PerjalananController.selesai
)

perjalananRouter.post(
  "/berhenti-darurat",
  authDriverMiddleware,
  PerjalananController.berhentiDarurat
)

export default perjalananRouter
