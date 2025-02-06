import express from 'express'
import {
  userSignUpController,
  userLogin,
} from '../controllers/userSignUpController.js'

const router = express.Router()

router.post('/api/signup', userSignUpController)
router.post('/api/signin', userLogin)

export default router
