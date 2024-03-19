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

export const productVersionSchema = new Schema({
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

export const productCategorySchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
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
