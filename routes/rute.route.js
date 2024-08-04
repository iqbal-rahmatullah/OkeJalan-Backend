import { Router } from "express"
import RuteController from "../controllers/RuteController.js"
import authMiddleware from "../middleware/Authenticate.js"
import authDriverMiddleware from "../middleware/DriverAuthenticate.js"
const ruteRouter = Router()

ruteRouter.get("/", (req, res) => {
  res.json({ message: "OkeJalan rute service" })
})
ruteRouter.get("/get-all", authMiddleware, RuteController.getAllRute)
ruteRouter.get("/get-rute-angkot", authMiddleware, RuteController.getRuteAngkot)
ruteRouter.get("/search/:key", authMiddleware, RuteController.searchRute)
ruteRouter.post("/add_favorite", authMiddleware, RuteController.addFavorite)
ruteRouter.get(
  "/get-penumpang/:id_rute",
  authDriverMiddleware,
  RuteController.getJumlahPenumpang
)
ruteRouter.get(
  "/get-rute-perjalanan",
  authMiddleware,
  RuteController.getRutePerjalanan
)

export default ruteRouter
