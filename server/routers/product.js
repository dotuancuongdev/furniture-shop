import express from "express"
import { adminAuth, userAuth } from "../middlewares/auth.js"
import productController from "../controllers/product.js"

const productRouter = express.Router()

productRouter.get("/", productController.get)
productRouter.get("/:id", productController.getDetail)
productRouter.post("/", userAuth, adminAuth, productController.create)
productRouter.put("/:id", userAuth, adminAuth, productController.update)
// productRouter.delete("/:id", userAuth, adminAuth, productController.remove)

export default productRouter
