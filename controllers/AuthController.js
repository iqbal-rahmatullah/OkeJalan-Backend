import vine, { errors } from "@vinejs/vine"
import { signUpValidation } from "../validation/authValidation.js"
import prisma from "../data/db.config.js"
import bcrypt from "bcryptjs"

class AuthController {
  static signUp = async (req, res) => {
    try {
      const validator = vine.compile(signUpValidation)
      const payload = await validator.validate(req.body)

      //check email/phone if already exist
      const user = await prisma.users.findFirst({
        where: {
          OR: [
            {
              email: payload.email,
            },
            {
              no_hp: payload.no_hp,
            },
          ],
        },
      })

      if (user) {
        if (user.email === payload.email) {
          return res
            .status(401)
            .json({ message: `Email ${payload.email} already registered.` })
        } else if (user.no_hp === payload.no_hp) {
          return res.status(401).json({
            message: `Phone number ${payload.no_hp} already registered.`,
          })
        }
      }

      //Encrypt password
      const salt = await bcrypt.genSalt(10)
      payload.password = await bcrypt.hash(payload.password, salt)

      const data = await prisma.users.create({
        data: payload,
      })

      return res.status(201).json({ message: "User created", data })
    } catch (error) {
      console.log(error)
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ message: error.messages })
      }
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  static login = async (req, res) => {
    try {
    } catch (error) {}
  }
}

export default AuthController
