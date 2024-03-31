import { STATUS_CODE_MESSAGE } from "../constants.js"
import orderService from "../services/order.js"

const getDetail = async (req, res) => {
  const { id } = req.params
  try {
    const item = await orderService.getDetail(id)
    if (!item) throw new Error()
    res.status(200).json(item)
  } catch (error) {
    res.status(404).json({ code: 404, message: STATUS_CODE_MESSAGE[404] })
  }
}

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
  getDetail,
  create,
}

export default orderController
