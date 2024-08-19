import vine, { errors } from "@vinejs/vine"
import {
  loginValidation,
  signUpValidation,
  updateUserValidation,
  updateLocationValidation,
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
            error: true,
            message: {
              email: `Email ${payload.email} already registered.`,
            },
          })
        } else if (user.no_hp === payload.no_hp) {
          return res.status(400).json({
            error: true,
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
        return res.status(400).json({ error: true, message: error.messages })
      }
      return res.status(500).json({
        error: true,
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
          error: true,
          message: {
            email: "Email is not registered.",
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
          error: true,
          message: {
            password: "Password is incorrect.",
          },
        })
      }

      const jwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        no_hp: user.no_hp,
        photo_url: user.photo_url,
        role: user.role,
        balance: user.balance,
        is_new: user.is_new,
      }

      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
        expiresIn: "365d",
      })

      return res.status(200).json({
        message: "Login success",
        token,
      })
    } catch (error) {
      console.log(error)
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ error: true, message: error.messages })
      }
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  }

  static loginDriver = async (req, res) => {
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
          error: true,
          message: {
            email: "Email is not registered.",
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
          error: true,
          message: {
            password: "Password is incorrect.",
          },
        })
      }

      if (user.role !== "driver") {
        return res.status(400).json({
          error: true,
          message: {
            role: "You don't have permission..",
          },
        })
      }

      const jwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        no_hp: user.no_hp,
        photo_url: user.photo_url,
        role: user.role,
        balance: user.balance,
        is_new: user.is_new,
      }

      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
        expiresIn: "365d",
      })

      return res.status(200).json({
        message: "Login success",
        token,
      })
    } catch (error) {
      console.log(error)
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ error: true, message: error.messages })
      }
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  }

  static detailUser = async (req, res) => {
    try {
      const user = await prisma.users.findFirst({
        where: {
          id: req.user.id,
        },
      })

      if (user.role === "driver") {
        const angkot = await prisma.angkot.findFirst({
          where: {
            id_sopir: user.id,
          },
        })

        return res.status(200).json({
          message: "Succesfully get detail user",
          data: {
            ...user,
            angkot_id: angkot.id,
          },
        })
      }

      return res
        .status(200)
        .json({ message: "Succesfully get detail user", data: user })
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ error: true, message: "Internal server error." })
    }
  }

  static updateUser = async (req, res) => {
    try {
      const validator = vine.compile(updateUserValidation)
      const payload = await validator.validate(req.body)
      const user = req.user

      //check email/phone if already exist
      const userValidate = await prisma.users.findFirst({
        where: {
          OR: [
            {
              email: payload.email,
              NOT: { id: user.id },
            },
            {
              no_hp: payload.no_hp,
              NOT: { id: user.id },
            },
          ],
        },
      })

      if (userValidate) {
        if (userValidate.email === payload.email) {
          return res.status(400).json({
            error: true,
            message: {
              email: `Email ${payload.email} already registered.`,
            },
          })
        } else if (userValidate.no_hp === payload.no_hp) {
          return res.status(400).json({
            error: true,
            message: {
              no_hp: `Phone number ${payload.no_hp} already registered.`,
            },
          })
        }
      }

      await prisma.users.update({
        where: {
          id: user.id,
        },
        data: payload,
      })

      if (user.role === "driver") {
        const newData = await prisma.users.findFirst({
          where: {
            id: user.id,
          },
        })

        const angkot = await prisma.angkot.findFirst({
          where: {
            id_sopir: newData.id,
          },
        })

        return res.status(200).json({
          message: "Succesfully get detail user",
          data: {
            ...newData,
            angkot_id: angkot.id,
          },
        })
      }

      const newData = await prisma.users.findFirst({
        where: {
          id: user.id,
        },
      })

      return res
        .status(200)
        .json({ message: "Succesfully update data user", data: newData })
    } catch (error) {
      console.log(error)
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ error: true, message: error.messages })
      }
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  }

  static async setOnboarding(req, res) {
    try {
      const response = await prisma.users.update({
        where: {
          id: req.user.id,
        },
        data: {
          is_new: false,
        },
      })

      return res.status(200).json({
        status: "success",
        data: response,
      })
    } catch (error) {
      console.log(error)
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ error: true, message: error.messages })
      }
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }

  static async updateLocation(req, res) {
    try {
      const validation = vine.compile(updateLocationValidation)
      const payload = await validation.validate(req.body)

      const response = await prisma.users.update({
        data: {
          lat: payload.lat.toString(),
          long: payload.long.toString(),
        },
        where: {
          id: req.user.id,
        },
      })

      return res.status(200).json({
        message: "Successfully update location",
        data: response,
      })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ error: true, message: error.messages })
      }
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        data: error.message,
      })
    }
  }
}

export default AuthController
