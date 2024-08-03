import { Router } from "express"
import AuthController from "../controllers/AuthController.js"
import authMiddleware from "../middleware/Authenticate.js"
import authDriverMiddleware from "../middleware/DriverAuthenticate.js"

const authRouter = Router()

authRouter.get("/", (req, res) => {
  res.json({ message: "Auth Router" })
})
authRouter.post("/signup", AuthController.signUp)
authRouter.post("/login", AuthController.login)
authRouter.post("/login-driver", AuthController.loginDriver)
authRouter.get("/detail-user", authMiddleware, AuthController.detailUser)
authRouter.put("/update-user", authMiddleware, AuthController.updateUser)
authRouter.put("/set-onboarding", authMiddleware, AuthController.setOnboarding)
authRouter.put(
  "/update-location",
  authDriverMiddleware,
  AuthController.updateLocation
)

export default authRouter
