import express from 'express'
import {
  userSignUpController,
  userLoginController,
  getUserProfileController,
} from '../controllers/userSignUpController.js'

const router = express.Router()

router.post('/api/signup', userSignUpController)
router.post('/api/signin', userLoginController)
router.get('/api/profile', getUserProfileController)

export default router
