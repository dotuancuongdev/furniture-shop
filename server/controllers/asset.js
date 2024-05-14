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

const assetController = { upload }

export default assetController
