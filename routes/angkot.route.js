import { Router } from "express"
import AngkotController from "../controllers/AngkotController.js"
import authMiddleware from "../middleware/Authenticate.js"
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

export default angkotRouter
