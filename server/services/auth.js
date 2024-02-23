import jwt from "jsonwebtoken"

const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_KEY } = process.env

const TOKEN_EXPIRE_IN_SECONDS = 60 * 60

const login = async (username, password) => {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const payload = {
      username,
    }
    const token = jwt.sign(payload, JWT_KEY, {
      expiresIn: TOKEN_EXPIRE_IN_SECONDS,
    })
    return { user: payload, token }
  }

  throw new Error("Invalid request")
}

const authService = { login }

export default authService
