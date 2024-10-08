import "dotenv/config"
import express from "express"
import cors from "cors"
import cron from "node-cron"

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

import authRouter from "./routes/auth.route.js"
import ruteRouter from "./routes/rute.route.js"
import angkotRouter from "./routes/angkot.route.js"
import transactionRouter from "./routes/transaction.route.js"
import jadwalRouter from "./routes/jadwal.route.js"
import paymentRouter from "./routes/payment.route.js"
import perjalananRouter from "./routes/perjalanan.route.js"
import voucherRouter from "./routes/voucher.route.js"
import chatRouter from "./routes/chat.route.js"
import prisma from "./data/db.config.js"
app.get("/", (req, res) => {
  res.json({ message: "OkeJalan API V1" })
})
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/rute", ruteRouter)
app.use("/api/v1/angkot", angkotRouter)
app.use("/api/v1/transaction", transactionRouter)
app.use("/api/v1/jadwal", jadwalRouter)
app.use("/api/v1/payment", paymentRouter)
app.use("/api/v1/perjalanan", perjalananRouter)
app.use("/api/v1/voucher", voucherRouter)
app.use("/api/v1/chats", chatRouter)

cron.schedule("0 0 * * *", async () => {
  try {
    await prisma.rute.updateMany({
      data: {
        is_done: false,
      },
    })
  } catch (error) {
    console.error("Terjadi kesalahan :", error)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
