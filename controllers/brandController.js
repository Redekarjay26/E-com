import Brand from '../module/Brand.js'
import asyncHandler from 'express-async-handler'

export const createBrandController = asyncHandler(async (req, res) => {
  const { name } = req.body

  const brandFound = await Brand.findOne({ name })
  if (brandFound) {
    throw new Error('brand allready exits')
  }

  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  })
  res.json({
    status: 'success',
    message: 'Brand created successfully',
    brand,
  })
})

export const getAllBrandCOltroller = asyncHandler(async (req, res) => {
  const brands = await Brand.find()
  res.json({
    status: 'success',
    message: 'Brands fetched successfully',
    brands,
  })
})

export const getSingleBrandController = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id)

  res.json({
    status: 'success',
    message: 'Brand fetched successfully',
    brand,
  })
})

export const updateBrandController = asyncHandler(async (req, res) => {
  const { name } = req.body
  const brandUpdate = await Brand.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  )
  res.json({
    status: 'success',
    message: 'Brand updated successfully',
    brandUpdate,
  })
})

export const deleteBrandController = asyncHandler(async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id)

  res.json({
    status: 'success',
    message: 'brand deleted successfully',
  })
})
