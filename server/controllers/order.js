import mailService from "../services/mail.js"
import { STATUS_CODE_MESSAGE } from "../constants.js"
import orderService from "../services/order.js"

const { COMMERCE_URL } = process.env

const get = async (req, res) => {
  const { query } = req
  try {
    const result = await orderService.get(query)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

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
    const { name, phone, address, cityId, productsWithQuantity, email } =
      req.body
    if (!name || !name.trim()) throw new Error("Name is required")
    if (!phone || !phone.trim()) throw new Error("Phone is required")
    if (!address || !address.trim()) throw new Error("Address is required")
    if (!cityId) throw new Error("City is required")
    if (!productsWithQuantity || productsWithQuantity.length < 1)
      throw new Error("Please select product")

    const result = await orderService.create(req.body)

    if (email) {
      mailService.send({
        from: "order.support@gmail.com",
        to: email,
        subject: "Order detail",
        html: `
        <p>Your order <b>${result._id}</b> is successfully placed!</p>
        <p>You can track your order <a href="${COMMERCE_URL}/order-tracking/${result._id}" target=”_blank”>here</a>.</p>
        `,
      })
    }

    res.status(201).json({ _id: result.id })
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const orderController = {
  get,
  getDetail,
  create,
}

export default orderController
