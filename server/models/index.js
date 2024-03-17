import mongoose from "mongoose"
const { Schema } = mongoose

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { collection: "Categories" }
)

export const Category = mongoose.model("Category", categorySchema)
