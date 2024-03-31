import express from "express"
import orderController from "../controllers/order.js"

const orderRouter = express.Router()

orderRouter.post("/", orderController.create)

// orderRouter.get("/", orderController.get)

export default orderRouter
