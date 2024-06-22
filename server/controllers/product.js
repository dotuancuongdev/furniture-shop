import { ProductVersion } from "../models/index.js"
import { STATUS_CODE_MESSAGE } from "../constants.js"
import productService from "../services/product.js"

const getForCommerce = async (req, res) => {
  const { query } = req
  try {
    const result = await productService.getForCommerce(query)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const getDetailForCommerce = async (req, res) => {
  const { id } = req.params
  try {
    const item = await productService.getDetailForCommerce(id)
    if (!item) throw new Error()
    res.status(200).json(item)
  } catch (error) {
    res.status(404).json({ code: 404, message: STATUS_CODE_MESSAGE[404] })
  }
}

const getFeatured = async (req, res) => {
  try {
    const item = await productService.getFeatured()
    if (!item) throw new Error()
    res.status(200).json(item)
  } catch (error) {
    res.status(404).json({ code: 404, message: STATUS_CODE_MESSAGE[404] })
  }
}

const getIconic = async (req, res) => {
  try {
    const item = await productService.getIconic()
    if (!item) throw new Error()
    res.status(200).json(item)
  } catch (error) {
    res.status(404).json({ code: 404, message: STATUS_CODE_MESSAGE[404] })
  }
}

const get = async (req, res) => {
  const { query } = req
  try {
    const result = await productService.get(query)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const getDetail = async (req, res) => {
  const { id } = req.params
  try {
    const item = await productService.getDetail(id)
    if (!item) throw new Error()
    res.status(200).json(item)
  } catch (error) {
    res.status(404).json({ code: 404, message: STATUS_CODE_MESSAGE[404] })
  }
}

const create = async (req, res) => {
  try {
    const { name, price, categoryIds } = req.body
    if (!name || !name.trim()) throw new Error("Name is required")
    if (!price || price < 0) throw new Error("Price is greater than 0")
    if (!categoryIds || categoryIds.length < 1)
      throw new Error("Please select category")

    const exist = await ProductVersion.findOne({ name, isActive: true })
    if (exist) throw new Error("Duplicate name")

    const result = await productService.create(req.body)
    res.status(201).json({ _id: result.id })
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  try {
    const exist = await productService.getDetail(id)
    if (!exist) throw new Error()
  } catch (error) {
    res.status(404).json({ code: 404, message: STATUS_CODE_MESSAGE[404] })
    return
  }
  try {
    const result = await productService.update(id, req.body)
    res.status(200).json({ _id: result.id })
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const remove = async (req, res) => {
  //   const { id } = req.params
  //   try {
  //     const exist = await productService.getDetail(id)
  //     if (!exist) throw new Error()
  //   } catch (error) {
  //     res.status(404).json({ code: 404, message: STATUS_CODE_MESSAGE[404] })
  //     return
  //   }
  //   try {
  //     const result = await productService.remove(id)
  //     res.status(200).json({ _id: result._id })
  //   } catch (error) {
  //     res.status(400).json({ code: 400, message: error.message })
  //   }
}

const productController = {
  getForCommerce,
  getDetailForCommerce,
  getFeatured,
  getIconic,
  get,
  getDetail,
  create,
  update,
  remove,
}

export default productController
