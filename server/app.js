import "dotenv/config"
import bodyParser from "body-parser"
import cors from "cors"
import express from "express"

import router from "./routers/index.js"
import mongoose from "mongoose"

import "./crawling.js"

const PORT = 8888

const { MONGODB_URI } = process.env

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connect to database successfully!")
  } catch (error) {
    console.log("Connect to database failed!")
    console.log(error)
  }
}
// connectToDatabase()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("/")
})

app.use("/api", router)

app.listen(PORT, () => {
  console.log(`Server: http://127.0.0.1:${PORT}`)
})
