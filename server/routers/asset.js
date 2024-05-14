import express from "express"
import assetController from "../controllers/asset.js"
import { adminAuth, userAuth } from "../middlewares/auth.js"
import multer from "multer"

const upload = multer({ dest: "uploads/" })
const assetRouter = express.Router()

assetRouter.post(
  "/upload",
  userAuth,
  adminAuth,
  upload.single("file"),
  assetController.upload
)

assetRouter.post(
  "/multiple-upload",
  userAuth,
  adminAuth,
  upload.array("files"),
  assetController.multipleUpload
)

export default assetRouter
