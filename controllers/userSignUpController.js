import userModel from '../module/userModel.js'
import bcrypt from 'bcrypt'

export const userSignUpController = async (req, res) => {
  const { name, email, password } = req.body

  const emailExist = await userModel.findOne({ email })

  if (emailExist) {
    res.json({
      msg: 'email ID allready exist',
    })
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
}

export const userLogin = async (req, res) => {
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
    })
  } else {
    res.json({
      msg: 'user invalid',
    })
  }
}
