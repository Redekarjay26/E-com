import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from '../controllers/categoriesController.js'

const CategoriesRoutes = express.Router()

CategoriesRoutes.post('/api/categories', isLoggedIn, createCategoryController)
CategoriesRoutes.get('/api/categories', getAllCategoryController)
CategoriesRoutes.get('/api/categories/:id', getSingleCategoryController)
CategoriesRoutes.put('/api/categories/:id', updateCategoryController)
CategoriesRoutes.delete('/api/categories/:id', deleteCategoryController)
export default CategoriesRoutes
