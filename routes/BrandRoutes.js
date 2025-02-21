import express from 'express'
import {
  createBrandController,
  deleteBrandController,
  getAllBrandCOltroller,
  getSingleBrandController,
  updateBrandController,
} from '../controllers/brandController.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'

const BrandRouter = express.Router()

BrandRouter.post('/api/brands', isLoggedIn, createBrandController)
BrandRouter.get('/api/brands', getAllBrandCOltroller)
BrandRouter.get('/api/brands/:id', getSingleBrandController)
BrandRouter.put('/api/brands/:id', updateBrandController)
BrandRouter.delete('/api/brands/:id', deleteBrandController)

export default BrandRouter
