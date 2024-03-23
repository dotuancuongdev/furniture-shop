import express from "express"
import cityController from "../controllers/city.js"

const cityRouter = express.Router()

cityRouter.get("/", cityController.get)

export default cityRouter
