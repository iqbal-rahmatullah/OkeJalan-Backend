import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(401).json({ message: "Masukkan token authorization" })
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
      if (error) {
        return res
          .status(401)
          .json({ message: "Token yang anda masukkan tidak valid" })
      }

      req.user = user
      next()
    })
  } catch (error) {
    return res.status(500).json({ message: "Tejadi kesalahan server" })
  }
}

export default authMiddleware
