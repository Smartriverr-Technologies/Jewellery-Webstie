import express from 'express';
const router = express.Router();
import { getHeroSlides, createHeroSlide, deleteHeroSlide } from '../controllers/heroCarouselController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

router.route('/').get(getHeroSlides).post(protect, admin, createHeroSlide);
router.route('/:id').delete(protect, admin, deleteHeroSlide);

export default router;