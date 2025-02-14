import Product from '../module/Product.js'
import asyncHandler from 'express-async-handler'

export const CreateProductController = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body

  const productExists = await Product.findOne({ name })

  if (productExists) {
    throw new Error('product already exists')
  }

  const product = await Product.create({
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
  })
  //pust product into category
  //send response

  res.json({
    status: 'success',
    msg: 'Product ctrated Successfully',
    product,
  })
})

export const getAllProductsController = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.json({
    status: 'success',
    products,
  })
})
