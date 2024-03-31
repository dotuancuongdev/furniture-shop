import express from "express"
import orderController from "../controllers/order.js"

const orderRouter = express.Router()

orderRouter.get("/:id", orderController.getDetail)
orderRouter.post("/", orderController.create)

export default orderRouter
