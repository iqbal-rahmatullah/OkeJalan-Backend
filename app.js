import "dotenv/config"
import express from "express"
import cors from "cors"

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

import authRouter from "./routes/auth.route.js"
import ruteRouter from "./routes/rute.route.js"
import angkotRouter from "./routes/angkot.route.js"
import transactionRouter from "./routes/transaction.route.js"
app.get("/", (req, res) => res.json({ message: "OkeJalan API V1" }))
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/rute", ruteRouter)
app.use("/api/v1/angkot", angkotRouter)
app.use("/api/v1/transaction", transactionRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
