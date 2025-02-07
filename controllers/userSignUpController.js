import asyncHandler from 'express-async-handler'
import userModel from '../module/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken.js'
import { getTokenForm } from '../utils/getTokenFrom.js'
import { verifyToken } from '../utils/verifyToken.js'

export const userSignUpController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const emailExist = await userModel.findOne({ email })

  if (emailExist) {
    throw new Error('email ID allready exist')
  }
  //has password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  //create user
  const user = await userModel.create({
    name,
    email,
    password: hashPassword,
  })
  res.status(201).json({
    status: 'success',
    msg: 'user created successfully',
    data: user,
  })
})

export const userLoginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const userFound = await userModel.findOne({ email })

  if (
    userFound &&
    (await bcrypt.compare(String(password), String(userFound?.password)))
  ) {
    res.json({
      status: 'success',
      msg: 'user created sussessfully',
      userFound,
      token: generateToken(userFound?._id),
    })
  } else {
    throw new Error('invalid user')
  }
})

export const getUserProfileController = asyncHandler(async (req, res) => {
  const token = getTokenForm(req)
  console.log(token)
  const verified = verifyToken(token)
  console.log(verified)

  res.json({
    msg: 'user profile created',
  })
})
