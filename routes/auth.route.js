import { Router } from "express"
import AuthController from "../controllers/AuthController.js"
import authMiddleware from "../middleware/Authenticate.js"

const authRouter = Router()

authRouter.get("/", (req, res) => {
  res.json({ message: "Auth Router" })
})
authRouter.post("/signup", AuthController.signUp)
authRouter.post("/login", AuthController.login)
authRouter.get("/detail-user", authMiddleware, AuthController.detailUser)
authRouter.put("/update-user", authMiddleware, AuthController.updateUser)

export default authRouter
