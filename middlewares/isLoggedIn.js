import { getTokenForm } from '../utils/getTokenFrom.js'
import { verifyToken } from '../utils/verifyToken.js'
import asyncHandler from 'express-async-handler'

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const token = await getTokenForm(req)
  const decoddedToken = verifyToken(token)
  if (!decoddedToken) {
    throw new Error('Token expired or invalid, please login again')
  } else {
    req.userAuthId = decoddedToken?.id
  }
  next()
})
