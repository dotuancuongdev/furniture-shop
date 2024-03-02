import { DataTypes } from "sequelize"
import sequelize from "../db.js"

export const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
})

export const Product = sequelize.define("Product", {
  summary: {
    type: DataTypes.TEXT,
  },
  desciption: {
    type: DataTypes.TEXT,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: [],
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
})

export const ProductCategory = sequelize.define("ProductCategory", {})

export const ProductVersion = sequelize.define("ProductVersion", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  thumbnail: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})

export const Order = sequelize.define("Order", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})

export const OrderDetail = sequelize.define("OrderDetail", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
})

export const City = sequelize.define("City", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})

ProductVersion.belongsTo(Product)
Product.hasMany(ProductVersion)

Product.belongsToMany(Category, { through: "ProductCategory" })
Category.belongsToMany(Product, { through: "ProductCategory" })

Order.hasOne(City)
City.hasMany(Order)

Order.belongsToMany(ProductVersion, { through: "OrderDetail" })
ProductVersion.belongsToMany(Order, { through: "OrderDetail" })
