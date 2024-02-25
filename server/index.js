import "dotenv/config"
import bodyParser from "body-parser"
import cors from "cors"
import express from "express"

import router from "./routers/index.js"
import sequelize from "./db.js"

const PORT = 8888

const connectToDatabase = async () => {
  try {
    await sequelize.sync()
    console.log("Connect to database successfully!")
  } catch (error) {
    console.log("Connect to database failed!")
    console.log(error)
  }
}
connectToDatabase()

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
