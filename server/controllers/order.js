import orderService from "../services/order.js"

// const get = async (req, res) => {
//   const { query } = req
//   try {
//     const result = await orderService.get(query)
//     res.status(200).json(result)
//   } catch (error) {
//     res.status(400).json({ code: 400, message: error.message })
//   }
// }

const create = async (req, res) => {
  try {
    const { name, phone, address, cityId, productsWithQuantity } = req.body
    if (!name || !name.trim()) throw new Error("Name is required")
    if (!phone || !phone.trim()) throw new Error("Phone is required")
    if (!address || !address.trim()) throw new Error("Address is required")
    if (!cityId) throw new Error("City is required")
    if (!productsWithQuantity || productsWithQuantity.length < 1)
      throw new Error("Please select product")

    const result = await orderService.create(req.body)
    res.status(201).json({ _id: result.id })
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const orderController = {
  // get,
  create,
}

export default orderController
