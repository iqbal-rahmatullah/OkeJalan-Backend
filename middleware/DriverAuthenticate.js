import jwt from "jsonwebtoken"

const authDriverMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ erorr: true, message: "Masukkan token authorization" })
    }

    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(401).json({
          erorr: true,
          message: "Token yang anda masukkan tidak valid",
        })
      }
      if (user.role !== "driver") {
        return res.status(400).json({
          erorr: true,
          message: "You are not authorized to access this route",
        })
      }

      req.user = user
      next()
    })
  } catch (error) {
    return res
      .status(500)
      .json({ erorr: true, message: "Tejadi kesalahan server" })
  }
}

export default authDriverMiddleware
