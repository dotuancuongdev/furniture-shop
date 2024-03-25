import puppeteer from "puppeteer"
import { Category } from "../models/index.js"
import productService from "../services/product.js"

const crawlProduct = async () => {
  const categories = await Category.find().exec()
  //   const categories = await Category.find().limit(1).exec()
  const cateLinks = categories.map((c) => ({
    creditURL: c.creditURL,
    _id: c._id,
  }))
  for (const link of cateLinks) {
    ;(async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      await page.goto(link.creditURL, {
        timeout: 0,
        waitUntil: "domcontentloaded",
      })

      const productLinks = await page.evaluate(() => {
        const products = document.querySelectorAll(
          ".product-detail .box-pro-detail .pro-name a"
        )
        const prds = Array.from(products).map((a) => a.href)
        return prds
      })

      const sampleLinks = [productLinks[0]]

      for (const prdLink of productLinks) {
        //   for (const prdLink of sampleLinks) {
        await page.goto(prdLink, { timeout: 0, waitUntil: "domcontentloaded" })
        const productData = await page.evaluate(() => {
          const summary =
            document.querySelector("#add-item-form .pro-short-desc")
              ?.innerHTML || ""

          const description =
            document.querySelector(
              "#description_product .description-content .description-productdetail"
            )?.innerHTML || ""

          const image = document.querySelectorAll(
            ".product-content-img .product-gallery .product-gallery__thumbs-container .product-gallery__thumbs img"
          )
          const images = Array.from(image)?.map((i) => i.src) || []

          const originalPrice = parseInt(
            document
              .querySelector("#price-preview del")
              ?.textContent?.replaceAll("đ", "")
              .replaceAll(",", "") || "0"
          )

          const name =
            document.querySelector("#detail-product .product-title h1")
              ?.textContent || `Test product ${new Date().getTime()}`

          const price = parseInt(
            document
              .querySelector("#price-preview .pro-price")
              ?.textContent?.replaceAll("đ", "")
              .replaceAll(",", "") || "0"
          )

          //   const prd = {
          //     summary,
          //     description,
          //     images,
          //     stock: Math.floor(Math.random() * 100),
          //     originalPrice,
          //     creditURL: prdLink,
          //     // productVersions
          //     // productCategories: [link._id]
          //   }

          //   const version = {
          //     name,
          //     price,
          //     thumbnail: images[0],
          //     isActive: true,
          //     // product
          //   }

          //   const prdCtgr = {
          //     // product:
          //     category: link._id,
          //   }

          //   const category = {
          //     // productCategories
          //   }

          return {
            summary,
            description,
            images,
            originalPrice,
            name,
            price,
            thumbnail: images[0],
            stock: Math.floor(Math.random() * 100),
          }
        })

        const {
          summary,
          description,
          images,
          originalPrice,
          name,
          price,
          stock,
          thumbnail,
        } = productData

        try {
          await productService.create({
            summary,
            description,
            images,
            stock,
            originalPrice,
            creditURL: prdLink,
            name,
            price,
            thumbnail,
            categoryIds: [link._id],
          })

          console.log("===Link, ", prdLink)
          console.log(
            "===Payload, ",
            JSON.stringify({
              summary,
              description,
              images,
              stock,
              originalPrice,
              creditURL: prdLink,
              name,
              price,
              thumbnail,
              categoryIds: [link._id],
            })
          )
        } catch (error) {}
      }

      await browser.close()
    })()
  }
}

export default crawlProduct
