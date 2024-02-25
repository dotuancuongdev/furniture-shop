import { Op } from "sequelize"
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants.js"
import { Category } from "../models/index.js"

const get = async (query) => {
  const { pageSize, pageNumber } = query
  const size = pageSize && pageSize > 0 ? parseInt(pageSize) : DEFAULT_PAGE_SIZE
  const number =
    pageNumber && pageNumber > 0 ? parseInt(pageNumber) : DEFAULT_PAGE_NUMBER

  const totalItems = await Category.count()
  const totalPages = Math.ceil(totalItems / size)
  const skipItemsCount = (number - 1) * size
  const items = await Category.findAll({
    order: ["id"],
    offset: skipItemsCount,
    limit: size,
  })
  return {
    items,
    pageSize: size,
    pageNumber: number,
    totalItems,
    totalPages,
  }
}

const getDetail = async (id) => {
  const item = await Category.findOne({ where: { id } })
  return item
}

const create = async (payload) => {
  const { name } = payload
  if (!name || !name.trim()) throw new Error("Name is required")
  const exist = await Category.findOne({ where: { name } })
  if (exist) throw new Error("Duplicate name")
  const result = await Category.create(payload)
  return result
}

const update = async (id, payload) => {
  const { name } = payload
  if (!name || !name.trim()) throw new Error("Name is required")
  const exist = await Category.findOne({ where: { name, id: { [Op.ne]: id } } })
  if (exist) throw new Error("Duplicate name")
  const result = await Category.update(payload, { where: { id } })
  return result
}

const remove = async (id) => {
  //   const result = await Category.findByIdAndDelete(id).exec()
  //   return result
}

const categoryService = {
  get,
  getDetail,
  create,
  update,
  remove,
}

export default categoryService
