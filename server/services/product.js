import { Op } from "sequelize"
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants.js"
import {
  Category,
  Product,
  ProductCategory,
  ProductVersion,
} from "../models/index.js"
import mongoose from "mongoose"

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

const getDetail = async (id) => {
  const item = await Category.findById(id).select("_id name description").exec()
  return item
}

const create = async (payload) => {
  const { summary, description, images, stock, categoryIds } = payload
  const { name, price, thumbnail } = payload

  console.log(payload)

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newProducts = await Product.create(
      [{ summary, description, images, stock }],
      { session }
    )
    const product = newProducts[0]

    const newProductVersions = await ProductVersion.create(
      [{ name, price, thumbnail, isActive: true }],
      { session }
    )
    const productVersion = newProductVersions[0]

    const productCategories = categoryIds.map((cId) => ({
      product: product?._id,
      category: cId,
    }))
    console.log("productCategories", productCategories)
    const prdCtgrs = await ProductCategory.insertMany(productCategories, {
      session,
    })
    const prdCtgrIds = prdCtgrs.map((pc) => pc._id)

    product.productVersions.push(productVersion?._id)
    product.productCategories = prdCtgrIds
    await product.save()

    productVersion.product = product._id
    await productVersion.save()

    await Category.updateMany(
      { _id: { $in: categoryIds } },
      { $push: { productCategories: { $each: prdCtgrIds } } }
    )

    await session.commitTransaction()
    await session.endSession()
    return product
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

const update = async (id, payload) => {
  const { name } = payload
  if (!name || !name.trim()) throw new Error("Name is required")
  const exist = await Category.findOne({ name, _id: { $ne: id } })
  if (exist) throw new Error("Duplicate name")
  const result = await Category.findByIdAndUpdate(id, payload)
  return result
}

const remove = async (id) => {
  //   const result = await Category.findByIdAndDelete(id).exec()
  //   return result
}

const productService = {
  get,
  getDetail,
  create,
  update,
  remove,
}

export default productService
