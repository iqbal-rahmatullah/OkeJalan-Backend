import vine, { errors } from "@vinejs/vine"
import {
  loginValidation,
  signUpValidation,
} from "../validation/authValidation.js"
import prisma from "../data/db.config.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
          return res.status(400).json({
            status: "error",
            message: {
              email: `Email ${payload.email} already registered.`,
            },
          })
        } else if (user.no_hp === payload.no_hp) {
          return res.status(401).json({
            status: "error",
            message: {
              no_hp: `Phone number ${payload.no_hp} already registered.`,
            },
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
        return res
          .status(400)
          .json({ status: "error", message: error.messages })
      }
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      })
    }
  }

  static login = async (req, res) => {
    try {
      const validation = vine.compile(loginValidation)
      const payload = await validation.validate(req.body)

      //check email
      const user = await prisma.users.findFirst({
        where: {
          email: payload.email,
        },
      })

      if (!user) {
        return res.status(400).json({
          status: "error",
          erorr: {
            email: "Email belum terdaftar",
          },
        })
      }

      //check password
      const validPassword = await bcrypt.compare(
        payload.password,
        user.password
      )

      if (!validPassword) {
        return res.status(400).json({
          status: "error",
          error: {
            password: "Password yang anda masukkan salah",
          },
        })
      }

      const jwtPayload = {
        id: user.id,
        email: user.email,
        no_hp: user.no_hp,
        photo_url: user.photo_url,
        role: user.role,
      }

      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
        expiresIn: "365d",
      })

      return res.status(200).json({
        message: "Login berhasil",
        token,
      })
    } catch (error) {
      console.log(error)
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res
          .status(400)
          .json({ status: "error", message: error.messages })
      }
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error" })
    }
  }

  static detailUser = async (req, res) => {
    try {
      const user = req.user

      return res
        .status(200)
        .json({ message: "Berhasil mendapatkan detail user", data: user })
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ status: "error", message: "Terjadi kesalahan server." })
    }
  }
}

export default AuthController
