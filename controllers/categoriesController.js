import Category from '../module/Category.js'
import asyncHandler from 'express-async-handler'

export const createCategoryController = asyncHandler(async (req, res) => {
  const { name } = req.body

  const categoryFound = await Category.findOne({ name })
  if (categoryFound) {
    throw new Error('category already exists')
  }

  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  })

  res.json({
    status: 'success',
    message: 'category created successfully',
    category,
  })
})

export const getAllCategoryController = asyncHandler(async (req, res) => {
  const categories = await Category.find()

  res.json({
    status: 'success',
    message: 'categories fetched successfully',
    categories,
  })
})

export const getSingleCategoryController = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (!category) {
    throw new Error('category not found')
  } else {
    res.json({
      status: 'success',
      message: 'category fetched successfully',
      category,
    })
  }
})

export const updateCategoryController = asyncHandler(async (req, res) => {
  const { name } = req.body

  //update
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
    }
  )
  res.json({
    status: 'success',
    message: 'category updated successfully',
    category,
  })
})

export const deleteCategoryController = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id)

  res.json({
    status: 'success',
    message: 'category deleted successfully',
  })
})
