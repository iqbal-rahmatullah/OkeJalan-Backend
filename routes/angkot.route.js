import { Router } from "express"
import AngkotController from "../controllers/AngkotController.js"
import authMiddleware from "../middleware/Authenticate.js"
import authDriverMiddleware from "../middleware/DriverAuthenticate.js"
const angkotRouter = Router()

angkotRouter.get("/", (req, res) => {
  res.json({ message: "OkeJalan angkot service" })
})
angkotRouter.get("/search-tiket", authMiddleware, AngkotController.searchAngkot)
angkotRouter.get(
  "/get-rating/:id",
  authMiddleware,
  AngkotController.getRatingAngkot
)
angkotRouter.get("/get-image/:file_name", AngkotController.getImageAngkot)
angkotRouter.get(
  "/favorite",
  authMiddleware,
  AngkotController.getFavoriteAngkot
)
angkotRouter.put(
  "/start-driver",
  authDriverMiddleware,
  AngkotController.startDriver
)

export default angkotRouter
