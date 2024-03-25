import { ORDER_STATUS } from "../constants.js"
import mongoose from "mongoose"
const { Schema } = mongoose

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  creditURL: {
    type: String,
  },
  productCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
  ],
})

const productSchema = new Schema({
  summary: {
    type: String,
  },
  description: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  stock: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0,
  },
  originalPrice: {
    type: Number,
    validator: (value) => value >= 0,
  },
  creditURL: {
    type: String,
  },
  productVersions: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductVersion",
    },
  ],
  productCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
  ],
})

const productVersionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validator: (value) => value >= 0,
  },
  thumbnail: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
})

const productCategorySchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
})

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
})

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ORDER_STATUS,
    default: ORDER_STATUS.PENDING,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: "City",
  },
})

const orderProductVersion = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  productVersion: {
    type: Schema.Types.ObjectId,
    ref: "ProductVersion",
  },
  quantity: {
    type: Number,
    required: true,
    validator: (value) => value > 0,
  },
})

export const Category = mongoose.model("Category", categorySchema)
export const Product = mongoose.model("Product", productSchema)
export const ProductVersion = mongoose.model(
  "ProductVersion",
  productVersionSchema
)
export const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
)
export const City = mongoose.model("City", citySchema)
export const Order = mongoose.model("Order", orderSchema)
export const OrderProductVersion = mongoose.model(
  "OrderProductVersion",
  orderProductVersion
)
