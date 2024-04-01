import express from "express"
import orderController from "../controllers/order.js"
import { adminAuth, userAuth } from "../middlewares/auth.js"

const orderRouter = express.Router()

orderRouter.get("/:id", orderController.getDetail)
orderRouter.post("/", orderController.create)

orderRouter.get("/", userAuth, adminAuth, orderController.get)

export default orderRouter
