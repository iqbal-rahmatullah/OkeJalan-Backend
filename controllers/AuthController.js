import vine, { errors } from "@vinejs/vine"
import { signUpValidation } from "../validation/authValidation.js"
import prisma from "../data/db.config.js"

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
            .json({ message: `Email ${payload.email} telah terdaftar.` })
        } else if (user.no_hp === payload.no_hp) {
          return res
            .status(401)
            .json({ message: `Nomor hp ${payload.no_hp} telah terdaftar.` })
        }
      }

      const data = await prisma.users.create({
        data: payload,
      })

      return res.status(201).json({ message: "User created", data })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ message: error.messages })
      }
      return res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default AuthController
