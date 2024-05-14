import { v2 as cloudinary } from "cloudinary"

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
})

const upload = async (path) => {
  const res = await cloudinary.uploader.upload(path, {
    resource_type: "auto",
  })
  return res
}

const assetService = { upload }

export default assetService
