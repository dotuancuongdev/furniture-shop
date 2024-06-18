import cheerio from "cheerio"
import axios from "axios"
import mongoose from "mongoose"

import { Category } from "./models/index.js"
import productService from "./services/product.js"

const { MONGODB_URI } = process.env

const baseURL = "https://responsive-theme-paris.myshopify.com"

const categories = [
  {
    name: "Wall sconces",
    description: "",
    thumbnail: "",
    creditURL:
      "https://responsive-theme-paris.myshopify.com/collections/wall-sconces",
    productCategories: [],
  },
  {
    name: "Ceiiling lights",
    description: "",
    thumbnail: "",
    creditURL:
      "https://responsive-theme-paris.myshopify.com/collections/ceiling-lights",
    productCategories: [],
  },
  {
    name: "Table & floor lamps",
    description: "",
    thumbnail: "",
    creditURL:
      "https://responsive-theme-paris.myshopify.com/collections/table-and-floor-lamps",
    productCategories: [],
  },
  {
    name: "Hardware",
    description: "",
    thumbnail: "",
    creditURL:
      "https://responsive-theme-paris.myshopify.com/collections/hardware",
    productCategories: [],
  },
]

;(async () => {
  return
  const prdUrls = []

  await mongoose.connect(MONGODB_URI)
  console.log("Connect to database successfully!")

  // Category.insertMany(categories)
  // return

  const ctgrs = await Category.find({})

  for (const ctgr of ctgrs) {
    const { creditURL } = ctgr
    const res = await axios.get(creditURL)
    if (res.data) {
      const $ = cheerio.load(res.data)
      const ds = $(res.data).find(`.one-third.column`)
      ds.each((i, el) => {
        const job = $(el).find("a")
        job.each((idx, j) => {
          const pUrl = j.attribs.href
          const exist = prdUrls.find((u) => u.pUrl === pUrl)
          if (!exist) {
            prdUrls.push({ pUrl, _id: ctgr._id })
          }
        })
      })
    }
  }

  // console.log("prdUrls", prdUrls)

  // return

  for (const prdUrl of prdUrls) {
    const res = await axios.get(baseURL + prdUrl.pUrl)
    if (res.data) {
      const $ = cheerio.load(res.data)

      const summary =
        $(res.data).find(`.description p:first-child`).text()?.trim() || ""

      // // const description = $(res.data).find(`#tab1`).html()
      const description = ""

      const imgUrls = []
      const imagesBlock = $(res.data).find(`.product-gallery__thumbnail img`)

      imagesBlock.each((i, img) => {
        const iUrl = $(img).attr("src")
        imgUrls.push("https:" + iUrl.replace("300x", "5000x"))
      })

      const images = imgUrls.slice(1)

      const stock = Math.ceil(100 * Math.random())

      // // categoryIds

      const name = $(res.data)
        .find(`h1.product__title`)
        .text()
        ?.trim()
        .replaceAll("\n", "")

      const price = parseInt(`${Math.ceil(100 * Math.random())}0`)

      const thumbnail = imgUrls[0]

      const prd = {
        summary,
        description,
        images,
        stock,
        categoryIds: [prdUrl._id],
        name,
        price,
        thumbnail,
        creditURL: baseURL + prdUrl.pUrl,
      }

      productService.create(prd)
      console.log(prd)
    }
    // break
  }
})()
