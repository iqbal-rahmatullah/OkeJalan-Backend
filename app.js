import "dotenv/config"
import express from "express"

const PORT = process.env.PORT || 8000
const app = express()

app.get("/", (req, res) => res.json({ message: "OkeJalan API V1" }))

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})