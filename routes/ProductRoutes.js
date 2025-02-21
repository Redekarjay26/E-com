import express from 'express'
import {
  CreateProductController,
  deleteProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
} from '../controllers/producrsController.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'

const ProductsRoutes = express.Router()

ProductsRoutes.post('/api/products', isLoggedIn, CreateProductController)
ProductsRoutes.get('/api/products', getAllProductsController)
ProductsRoutes.get('/api/products/:id', getProductController)
ProductsRoutes.put('/api/products/:id', isLoggedIn, updateProductController)
ProductsRoutes.delete(
  '/api/products/:id/delete',
  isLoggedIn,
  deleteProductController
)
export default ProductsRoutes
