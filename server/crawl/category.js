import puppeteer from "puppeteer"
import { Category } from "../models/index.js"

const categoryLinks = [
  "https://moho.com.vn/collections/tat-ca-san-pham-moho",
  "https://moho.com.vn/collections/bo-suu-tap-moi",
  "https://moho.com.vn/collections/uu-dai",
  "https://moho.com.vn/collections/phong-ngu",
  "https://moho.com.vn/collections/phong-khach",
  "https://moho.com.vn/collections/phong-an",
  "https://moho.com.vn/collections/phong-lam-viec",
  "https://moho.com.vn/collections/do-trang-tri",
  "https://moho.com.vn/collections/narvik",
  "https://moho.com.vn/collections/ubeda",
  "https://moho.com.vn/collections/koster-collection",
  "https://moho.com.vn/collections/grenaa",
  "https://moho.com.vn/collections/lango-collection",
  "https://moho.com.vn/collections/moho-kitchen",
  "https://moho.com.vn/collections/deal-chong-deal",
  "https://moho.com.vn/collections/tu-bep",
  "https://moho.com.vn/collections/vline-collection",
  "https://moho.com.vn/collections/moho-works",
  "https://moho.com.vn/collections/vienna-collection",
  "https://moho.com.vn/collections/oslo-collection",
  "https://moho.com.vn/collections/hobro-collection",
  "https://moho.com.vn/collections/milan-collection",
  "https://moho.com.vn/collections/odense-collection",
  "https://moho.com.vn/collections/fyn-collection",
  "https://moho.com.vn/collections/malaga-collection",
  "https://moho.com.vn/collections/fiji-collection",
  "https://moho.com.vn/collections/kolding-collection",
  "https://moho.com.vn/collections/moss-collection",
  "https://moho.com.vn/collections/nexo-collection",
  "https://moho.com.vn/collections/koge-collection",
  "https://moho.com.vn/collections/tu-quan-ao",
  "https://moho.com.vn/collections/giuong-ngu",
  "https://moho.com.vn/collections/tu-dau-giuong",
  "https://moho.com.vn/collections/ban-trang-diem",
  "https://moho.com.vn/collections/ghe-sofa",
  "https://moho.com.vn/collections/ban-sofa-ban-cafe-ban-tra",
  "https://moho.com.vn/collections/tu-ke-tivi",
  "https://moho.com.vn/collections/tu-giay-tu-trang-tri",
  "https://moho.com.vn/collections/ban-an",
  "https://moho.com.vn/collections/ghe-an",
  "https://moho.com.vn/collections/bo-ban-an",
  "https://moho.com.vn/collections/ban-lam-viec",
  "https://moho.com.vn/collections/ghe-van-phong",
  "https://moho.com.vn/collections/tu-ke",
  "https://moho.com.vn/collections/nem",
  "https://moho.com.vn/collections/grenaa-ubeda-narvik-collection",
  "https://moho.com.vn/collections/hot-products",
]

const crawlCategory = async () => {
  for (const link of categoryLinks) {
    ;(async () => {
      // Launch the browser and open a new blank page
      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      // Navigate the page to a URL
      await page.goto(link, { timeout: 0, waitUntil: "domcontentloaded" })

      // Evaluate JavaScript code in the page to find the img tag
      const imgData = await page.evaluate(() => {
        const imgs = document.querySelectorAll(
          'img[loading="eager"][fetchpriority="high"][decoding="sync"]'
        )
        const img = imgs[0]
        const imgLink = img.srcset.split(" ").pop()
        return {
          alt: img.alt,
          srcset: "https:" + imgLink,
        }
      })

      console.log("Image src with attributes:")
      console.log(imgData)

      await Category.create({
        name: imgData.alt,
        thumbnail: imgData.srcset,
        creditURL: link,
      })

      await browser.close()
    })()
  }
}

export default crawlCategory
