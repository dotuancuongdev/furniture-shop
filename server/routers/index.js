import express from "express"
import authRouter from "./auth.js"
import assetRouter from "./asset.js"
import categoryRouter from "./category.js"
import productRouter from "./product.js"
import cityRouter from "./city.js"
import orderRouter from "./order.js"

const router = express.Router()

router.use("/auth", authRouter)
router.use("/assets", assetRouter)
router.use("/categories", categoryRouter)
router.use("/products", productRouter)
router.use("/cities", cityRouter)
router.use("/orders", orderRouter)

export default router
