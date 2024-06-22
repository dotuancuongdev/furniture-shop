import express from "express"
import { adminAuth, userAuth } from "../middlewares/auth.js"
import categoryController from "../controllers/category.js"

const categoryRouter = express.Router()

categoryRouter.get("/", categoryController.get)
categoryRouter.get("/all", categoryController.getAll)
categoryRouter.get("/menu", categoryController.getFromMenu)
categoryRouter.get("/collections", categoryController.getCollections)
categoryRouter.get("/featured", categoryController.getFeaturedCategories)
categoryRouter.get("/promotions", categoryController.getPromotions)
categoryRouter.get("/:id", categoryController.getDetail)
categoryRouter.post("/", userAuth, adminAuth, categoryController.create)
categoryRouter.put("/:id", userAuth, adminAuth, categoryController.update)
// categoryRouter.delete("/:id", userAuth, adminAuth, categoryController.remove)

export default categoryRouter
