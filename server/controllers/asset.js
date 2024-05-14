import authService from "../services/asset.js"
import fs from "fs"

const upload = async (req, res) => {
  const { file } = req
  if (!file) {
    res.status(400).json({ code: 400, message: "No file" })
    return
  }

  try {
    const result = await authService.upload(file.path)
    const { url } = result
    fs.unlink(file.path, (err) => {
      if (err) console.log(err)
    })
    res.status(200).json({ url })
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const multipleUpload = async (req, res) => {
  const { files } = req
  if (!files || files.length === 0) {
    res.status(400).json({ code: 400, message: "No files" })
    return
  }

  try {
    const paths = files.map((f) => f.path)
    const results = await authService.multipleUpload(paths)
    const urls = results.map((res) => res.url)

    fs.rmSync("uploads", { recursive: true, force: true })

    res.status(200).json({ urls })
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const assetController = { upload, multipleUpload }

export default assetController
