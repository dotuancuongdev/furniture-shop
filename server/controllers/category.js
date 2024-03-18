import { Category } from "../models/index.js"
import { STATUS_CODE_MESSAGE } from "../constants.js"
import categoryService from "../services/category.js"

const get = async (req, res) => {
  const { query } = req
  try {
    const result = await categoryService.get(query)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const getDetail = async (req, res) => {
  const { id } = req.params
  try {
    const item = await categoryService.getDetail(id)
    if (!item) throw new Error()
    res.status(200).json(item)
  } catch (error) {
    res.status(404).json({ code: 404, message: STATUS_CODE_MESSAGE[404] })
  }
}

const create = async (req, res) => {
  try {
    const { name } = req.body
    if (!name || !name.trim()) throw new Error("Name is required")

    const exist = await Category.findOne({ name })
    if (exist) throw new Error("Duplicate name")

    const result = await categoryService.create(req.body)
    res.status(201).json({ _id: result.id })
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  try {
    const exist = await categoryService.getDetail(id)
    if (!exist) throw new Error()
  } catch (error) {
    res.status(404).json({ code: 404, message: STATUS_CODE_MESSAGE[404] })
    return
  }

  try {
    const { name } = req.body
    if (!name || !name.trim()) throw new Error("Name is required")

    const exist = await Category.findOne({ name, _id: { $ne: id } })
    if (exist) throw new Error("Duplicate name")

    const result = await categoryService.update(id, req.body)
    res.status(200).json({ _id: result.id })
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const remove = async (req, res) => {
  //   const { id } = req.params
  //   try {
  //     const exist = await categoryService.getDetail(id)
  //     if (!exist) throw new Error()
  //   } catch (error) {
  //     res.status(404).json({ code: 404, message: STATUS_CODE_MESSAGE[404] })
  //     return
  //   }
  //   try {
  //     const result = await categoryService.remove(id)
  //     res.status(200).json({ _id: result._id })
  //   } catch (error) {
  //     res.status(400).json({ code: 400, message: error.message })
  //   }
}

const categoryController = {
  get,
  getDetail,
  create,
  update,
  remove,
}

export default categoryController
