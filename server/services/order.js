import { ORDER_STATUS } from "../constants.js"
import mongoose from "mongoose"
import {
  City,
  Order,
  OrderProductVersion,
  Product,
  ProductVersion,
} from "../models/index.js"

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
    .select("_id name email phone address status")
    .lean()
    .exec()

  const item = { ...order }
  if (order.city) {
    item.cityName = order.city.name
    item.city = undefined
  }
  if (order.orderProductVersions.length > 0) {
    item.products = order.orderProductVersions.map((opv) => ({
      _id: opv.productVersion.product._id,
      name: opv.productVersion.name,
      price: opv.productVersion.price,
      thumbnail: opv.productVersion.thumbnail,
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
  getDetail,
  create,
}

export default orderService
