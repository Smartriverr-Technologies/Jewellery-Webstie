import express from 'express';
const router = express.Router();
import { getSlides, createSlide, deleteSlide } from '../controllers/carouselController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

router.route('/').get(getSlides).post(protect, admin, createSlide);
router.route('/:id').delete(protect, admin, deleteSlide);

export default router;