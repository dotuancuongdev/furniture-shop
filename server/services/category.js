import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants.js"
import { Category } from "../models/index.js"

const get = async (query) => {
  const { pageSize, pageNumber } = query
  const size = pageSize && pageSize > 0 ? parseInt(pageSize) : DEFAULT_PAGE_SIZE
  const number =
    pageNumber && pageNumber > 0 ? parseInt(pageNumber) : DEFAULT_PAGE_NUMBER

  const totalItems = await Category.countDocuments()
  const totalPages = Math.ceil(totalItems / size)
  const skipItemsCount = (number - 1) * size
  const items = await Category.find()
    .skip(skipItemsCount)
    .limit(pageSize)
    .select("_id name description")
    .exec()
  return {
    items,
    pageSize: size,
    pageNumber: number,
    totalItems,
    totalPages,
  }
}

const getAll = async () => {
  const items = await Category.find().select("_id name").exec()
  return items
}

const getFromMenu = async () => {
  const items = await Category.find({
    isIncludedInMenu: true,
  })
    .select("_id name")
    .exec()
  return items
}

const getCollections = async () => {
  const items = await Category.find({
    name: { $regex: "collection" || "", $options: "i" },
  })
    .select("_id name")
    .exec()
  return items
}

const getFeaturedCategories = async () => {
  const totalCount = await Category.countDocuments({
    name: { $not: /collection/i },
  })
  const limit = Math.ceil(totalCount / 2)
  const items = await Category.find({
    name: { $not: /collection/i },
  })
    .limit(limit)
    .select("_id name")
    .exec()
  return items
}

const getPromotions = async () => {
  const totalCount = await Category.countDocuments({
    name: { $not: /collection/i },
  })
  const startIndex = Math.ceil(totalCount / 2)
  const items = await Category.find({
    name: { $not: /collection/i },
  })
    .skip(startIndex)
    .select("_id name")
    .exec()
  return items
}

const getDetail = async (id) => {
  const item = await Category.findById(id).select("_id name description").exec()
  return item
}

const create = async (payload) => {
  const result = await Category.create(payload)
  return result
}

const update = async (id, payload) => {
  const result = await Category.findByIdAndUpdate(id, payload)
  return result
}

const remove = async (id) => {
  //   const result = await Category.findByIdAndDelete(id).exec()
  //   return result
}

const categoryService = {
  get,
  getAll,
  getFromMenu,
  getCollections,
  getFeaturedCategories,
  getPromotions,
  getDetail,
  create,
  update,
  remove,
}

export default categoryService
