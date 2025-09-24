import express from 'express';
const router = express.Router();
import { getTestimonials, createTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

router.route('/').get(getTestimonials).post(protect, admin, createTestimonial);
router.route('/:id').delete(protect, admin, deleteTestimonial);

export default router;