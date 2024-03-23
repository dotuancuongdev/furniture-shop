import cityService from "../services/city.js"

const get = async (req, res) => {
  const { query } = req
  try {
    const result = await cityService.get(query)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const cityController = {
  get,
}

export default cityController
