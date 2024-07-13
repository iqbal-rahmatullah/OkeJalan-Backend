import "dotenv/config"
import express from "express"
import cors from "cors"

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


import authRouter from "./routes/auth.route.js"
app.get("/", (req, res) => res.json({ message: "OkeJalan API V1" }))
app.use("/api/v1/auth", authRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})