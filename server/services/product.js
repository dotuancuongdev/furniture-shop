import mongoose from "mongoose"
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants.js"
import {
  Category,
  Product,
  ProductCategory,
  ProductVersion,
} from "../models/index.js"

const FEATURED_COUNT = 3
const ICONIC_COUNT = 1

const getForCommerce = async (query) => {
  const { pageSize, pageNumber, categoryIds, minPrice, maxPrice, sortBy } =
    query

  const size = pageSize && pageSize > 0 ? parseInt(pageSize) : DEFAULT_PAGE_SIZE
  const number =
    pageNumber && pageNumber > 0 ? parseInt(pageNumber) : DEFAULT_PAGE_NUMBER

  let priceFilter = {}
  if (minPrice && parseInt(minPrice)) {
    priceFilter = { ...priceFilter, $gte: parseInt(minPrice) }
  }
  if (maxPrice && parseInt(maxPrice)) {
    priceFilter = { ...priceFilter, $lte: parseInt(maxPrice) }
  }

  const versionMatch = {
    isActive: { $eq: true },
  }

  if (Object.keys(priceFilter).length > 0) {
    versionMatch.price = priceFilter
  }

  let categoryFilter = {}
  if (categoryIds && categoryIds.length > 0) {
    categoryFilter = { _id: { $in: categoryIds } }
  }

  const products = await Product.find()
    .populate({
      path: "productVersions",
      match: versionMatch,
    })
    .populate({
      path: "productCategories",
      populate: {
        path: "category",
        match: categoryFilter,
      },
    })
    .select("_id originalPrice stock")
    .lean()
    .exec()

  const items = products
    .filter(
      (p) =>
        p.productVersions.length > 0 &&
        p.productCategories.some((pc) => pc.category)
    )
    .map((p) => {
      const prd = { ...p }
      if (p.productVersions.length > 0) {
        const version = p.productVersions[0]
        prd.name = version.name
        prd.price = version.price
        prd.thumbnail = version.thumbnail
      }
      prd.productVersions = undefined
      prd.productCategories = undefined
      return prd
    })

  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / size)
  const skipItemsCount = size * (number - 1)
  const chunkedItems = items.slice(skipItemsCount, skipItemsCount + size)

  return {
    items: chunkedItems,
    pageSize: size,
    pageNumber: number,
    totalItems,
    totalPages,
  }
}

const getDetailForCommerce = async (id) => {
  const product = await Product.findById(id)
    .populate({
      path: "productVersions",
      match: { isActive: { $eq: true } },
    })
    .populate({ path: "productCategories", populate: "category" })
    .select("_id summary description images stock originalPrice")
    .lean()
    .exec()

  const item = { ...product }
  if (product.productVersions.length > 0) {
    const version = product.productVersions[0]
    item.name = version.name
    item.price = version.price
    item.thumbnail = version.thumbnail
  }
  item.categoryNames = product.productCategories.map((pc) => pc.category.name)

  item.productVersions = undefined
  item.productCategories = undefined

  return item
}

const getFeatured = async () => {
  const productCount = await Product.countDocuments()
  const skip = Math.floor(Math.random() * productCount)

  const products = await Product.find({})
    .select("_id")
    .populate("productVersions")
    .skip(skip)
    .limit(FEATURED_COUNT)

  const prds = products.map((p) => {
    const activeVersion = p.productVersions.find((v) => v.isActive)
    return {
      _id: p._id,
      name: activeVersion?.name,
      price: activeVersion?.price,
      thumbnail: activeVersion?.thumbnail,
    }
  })

  return prds
}

const getIconic = async () => {
  const productCount = await Product.countDocuments()
  const skip = Math.floor(Math.random() * productCount)

  const product = (
    await Product.find({})
      .select("_id summary")
      .populate("productVersions")
      .skip(skip)
      .limit(ICONIC_COUNT)
  )[0]

  const activeVersion = product.productVersions.find((v) => v.isActive)

  const prd = {
    _id: product._id,
    summary: product.summary,
    name: activeVersion?.name,
    price: activeVersion?.price,
    thumbnail: activeVersion?.thumbnail,
  }

  return prd
}

const get = async (query) => {
  const { pageSize, pageNumber } = query
  const size = pageSize && pageSize > 0 ? parseInt(pageSize) : DEFAULT_PAGE_SIZE
  const number =
    pageNumber && pageNumber > 0 ? parseInt(pageNumber) : DEFAULT_PAGE_NUMBER

  const totalItems = await Product.countDocuments()
  const totalPages = Math.ceil(totalItems / size)
  const skipItemsCount = (number - 1) * size
  const products = await Product.find()
    .skip(skipItemsCount)
    .limit(pageSize)
    .populate({
      path: "productVersions",
      match: { isActive: { $eq: true } },
    })
    .populate({ path: "productCategories", populate: "category" })
    .select("_id summary description images stock originalPrice")
    .lean()
    .exec()

  const items = products.map((p) => {
    const prd = { ...p }
    if (p.productVersions.length > 0) {
      const version = p.productVersions[0]
      prd.name = version.name
      prd.price = version.price
      prd.thumbnail = version.thumbnail
    }
    const categoryIds = p.productCategories.map((pc) => pc.category._id)
    prd.categoryIds = categoryIds
    return prd
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
  const product = await Product.findById(id)
    .populate({
      path: "productVersions",
      match: { isActive: { $eq: true } },
    })
    .populate({ path: "productCategories", populate: "category" })
    .select("_id summary description images stock originalPrice")
    .lean()
    .exec()

  const item = { ...product }
  if (product.productVersions.length > 0) {
    const version = product.productVersions[0]
    item.name = version.name
    item.price = version.price
    item.thumbnail = version.thumbnail
  }
  const categoryIds = product.productCategories.map((pc) => pc.category._id)
  item.categoryIds = categoryIds

  return item
}

const create = async (payload) => {
  const { summary, description, images, stock, categoryIds } = payload
  const { name, price, thumbnail } = payload

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newProducts = await Product.create(
      [{ summary, description, images, stock, originalPrice: price }],
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

export default productService
