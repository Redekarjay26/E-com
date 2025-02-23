import express from 'express';
import {
  createColorController,
  DeleteColorController,
  getAllColorController,
  getSingleColorController,
  updateColorController,
} from '../controllers/colorController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const ColorRouter = express.Router();

ColorRouter.post('/api/colors', isLoggedIn, createColorController);
ColorRouter.get('/api/colors', getAllColorController);
ColorRouter.get('/api/colors/:id', getSingleColorController);
ColorRouter.put('/api/colors/:id', updateColorController);
ColorRouter.delete('/api/colors/:id', DeleteColorController);
export default ColorRouter;
