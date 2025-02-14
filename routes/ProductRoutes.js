import express from 'express'
import {
  CreateProductController,
  getAllProductsController,
} from '../controllers/producrsController.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'

const ProductsRoutes = express.Router()

ProductsRoutes.post('/api/products', isLoggedIn, CreateProductController)
ProductsRoutes.get('/api/products', getAllProductsController)

export default ProductsRoutes
