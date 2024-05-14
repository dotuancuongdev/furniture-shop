import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  ORDER_STATUS,
} from "../constants.js"
import mongoose from "mongoose"
import {
  City,
  Order,
  OrderProductVersion,
  Product,
  ProductVersion,
} from "../models/index.js"

const get = async (query) => {
  const { pageSize, pageNumber } = query
  const size = pageSize && pageSize > 0 ? parseInt(pageSize) : DEFAULT_PAGE_SIZE
  const number =
    pageNumber && pageNumber > 0 ? parseInt(pageNumber) : DEFAULT_PAGE_NUMBER

  const totalItems = await Order.countDocuments()
  const totalPages = Math.ceil(totalItems / size)
  const skipItemsCount = (number - 1) * size
  const orders = await Order.find()
    .skip(skipItemsCount)
    .limit(pageSize)
    .populate({
      path: "city",
      select: "name",
    })
    .populate({
      path: "orderProductVersions",
      select: "productVersion quantity",
      populate: {
        path: "productVersion",
        select: "_id name price thumbnail",
        populate: {
          path: "product",
          select: "_id",
        },
      },
    })
    .select("_id name email phone address status createdDate")
    .lean()
    .exec()

  const items = orders.map((o) => {
    const ord = { ...o }
    if (o.city) {
      ord.cityName = o.city.name
      ord.city = undefined
    }
    if (o.orderProductVersions?.length > 0) {
      let totalQuantity = 0
      let totalPrice = 0
      o.orderProductVersions.forEach((p) => {
        totalQuantity += p.quantity
        totalPrice += p.productVersion.price * p.quantity
      })
      ord.totalQuantity = totalQuantity
      ord.totalPrice = totalPrice
      ord.orderProductVersions = undefined
    }
    return ord
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
  const order = await Order.findById(id)
    .populate({
      path: "city",
      select: "name",
    })
    .populate({
      path: "orderProductVersions",
      select: "productVersion quantity",
      populate: {
        path: "productVersion",
        select: "_id name price thumbnail",
        populate: {
          path: "product",
          select: "_id",
        },
      },
    })
    .select("_id name email phone address status createdDate")
    .lean()
    .exec()

  const item = { ...order }
  if (order.city) {
    item.cityName = order.city.name
    item.city = undefined
  }
  if (order.orderProductVersions?.length > 0) {
    item.products = order.orderProductVersions.map((opv) => ({
      _id: opv.productVersion.product._id,
      name: opv.productVersion.name,
      price: opv.productVersion.price,
      thumbnail: opv.productVersion.thumbnail,
      quantity: opv.quantity,
    }))
    item.orderProductVersions = undefined
  }

  return item
}

const create = async (payload) => {
  const { name, email, phone, address, cityId, productsWithQuantity } = payload

  const productIds = productsWithQuantity.map((pq) => pq.productId)
  const productsWithVersion = await Product.find({ _id: { $in: productIds } })
    .select("_id")
    .populate({
      path: "productVersions",
      match: { isActive: { $eq: true } },
    })
    .exec()
  const productVersionIds = productsWithVersion.map(
    (p) => p.productVersions[0]?._id
  )

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newOrders = await Order.create(
      [
        {
          name,
          email,
          phone,
          address,
          status: ORDER_STATUS.PENDING,
          city: cityId,
        },
      ],
      { session }
    )
    const order = newOrders[0]

    await City.updateOne({ _id: cityId }, { $push: { orders: order._id } })

    const opvs = productsWithQuantity.map((pq) => ({
      order: order._id,
      productVersion: productsWithVersion.find((pv) => pv.id === pq.productId)
        ?.productVersions[0]?._id,
      quantity: pq.quantity,
    }))

    const newOrderProductVersions = await OrderProductVersion.create(opvs, {
      session,
    })

    const newOrderProductVersionIds = newOrderProductVersions.map(
      (opv) => opv._id
    )

    order.orderProductVersions = newOrderProductVersionIds
    await order.save()

    await ProductVersion.updateMany(
      { _id: { $in: productVersionIds } },
      { $push: { orderProductVersions: newOrderProductVersionIds } }
    )

    productsWithQuantity.forEach(async (prd) => {
      const product = await Product.findOne({ _id: prd.productId })
      if (product) product.stock -= prd.quantity
      await product.save()
    })

    await session.commitTransaction()
    await session.endSession()
    return order
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

const orderService = {
  get,
  getDetail,
  create,
}

export default orderService
