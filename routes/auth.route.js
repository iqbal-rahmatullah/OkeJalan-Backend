import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const authRouter =  Router()

authRouter.get("/", (req, res) => {
  res.json({ message: "Auth Router" })
})
authRouter.post("/signup", AuthController.signUp)  

export default authRouter