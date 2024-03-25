import express from "express"
import { adminAuth, userAuth } from "../middlewares/auth.js"
import productController from "../controllers/product.js"
import crawlProduct from "../crawl/product.js"

process.setMaxListeners(0)

const productRouter = express.Router()

productRouter.get("/test", async (req, res) => {
  crawlProduct()
  res.send("Test")
})
productRouter.get("/", productController.get)
productRouter.get("/:id", productController.getDetail)
productRouter.post("/", userAuth, adminAuth, productController.create)
productRouter.put("/:id", userAuth, adminAuth, productController.update)
// productRouter.delete("/:id", userAuth, adminAuth, productController.remove)

export default productRouter
