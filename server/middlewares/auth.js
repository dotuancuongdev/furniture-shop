import { STATUS_CODE_MESSAGE } from "../constants.js"
import jwt from "jsonwebtoken"

const { JWT_KEY, ADMIN_USERNAME } = process.env

export const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const token = authorization?.split(" ")[1]
    const decode = jwt.verify(token, JWT_KEY)
    const { userId, username } = decode
    req.user = { userId, username }
    next()
  } catch (error) {
    res.status(401).json({ code: 401, message: STATUS_CODE_MESSAGE[401] })
  }
}

export const adminAuth = async (req, res, next) => {
  try {
    if (req.user?.username !== ADMIN_USERNAME) throw new Error()
    next()
  } catch (error) {
    res.status(403).json({ code: 403, message: STATUS_CODE_MESSAGE[403] })
  }
}
