import jwt from 'jsonwebtoken'

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JSW_KEY, (err, decoded) => {
    if (err) {
      return 'token expire/invalid'
    } else {
      return decoded
    }
  })
}
