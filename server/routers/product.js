import express from "express"
import { adminAuth, userAuth } from "../middlewares/auth.js"
import productController from "../controllers/product.js"

const productRouter = express.Router()

productRouter.get("/commerce", productController.getForCommerce)
productRouter.get("/commerce/:id", productController.getDetailForCommerce)
productRouter.get("/", userAuth, adminAuth, productController.get)
productRouter.get("/:id", userAuth, adminAuth, productController.getDetail)
productRouter.post("/", userAuth, adminAuth, productController.create)
productRouter.put("/:id", userAuth, adminAuth, productController.update)
// productRouter.delete("/:id", userAuth, adminAuth, productController.remove)

export default productRouter
