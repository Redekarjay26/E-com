import express from 'express';
import { createReviewController } from '../controllers/reviewsController.js';
import { isLoggedIn } from './../middlewares/isLoggedIn.js';

const ReviewRoute = express.Router();

ReviewRoute.post('/api/reviews/:productID', isLoggedIn, createReviewController);

export default ReviewRoute;
