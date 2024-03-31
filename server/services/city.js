import { City } from "../models/index.js"

const get = async (query) => {
  const { search } = query
  const items = await City.find({
    name: { $regex: search || "", $options: "i" },
  })
    .sort({ name: "asc" })
    .select("_id name")
    .exec()
  return items
}

const cityService = {
  get,
}

export default cityService
