import express from "express"
import authRouter from "./auth.js"
import categoryRouter from "./category.js"
import productRouter from "./product.js"
import cityRouter from "./city.js"

const router = express.Router()

router.use("/auth", authRouter)
router.use("/categories", categoryRouter)
router.use("/products", productRouter)
router.use("/cities", cityRouter)

export default router
