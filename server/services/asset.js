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

const multipleUpload = async (paths) => {
  const responses = []

  for (const p of paths) {
    const res = await cloudinary.uploader.upload(p, {
      resource_type: "auto",
    })
    responses.push(res)
  }

  return responses
}

const assetService = { upload, multipleUpload }

export default assetService
