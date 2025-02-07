import jwt from 'jsonwebtoken'

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JSW_KEY, { expiresIn: '3d' })
}
