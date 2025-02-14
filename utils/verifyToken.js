import jwt from 'jsonwebtoken'

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JSW_KEY)
    return decoded
  } catch (err) {
    return false
  }
}
