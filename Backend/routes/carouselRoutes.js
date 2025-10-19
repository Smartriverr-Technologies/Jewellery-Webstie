// import express from 'express';
// const router = express.Router();
// import { getSlides, createSlide, deleteSlide } from '../controllers/carouselController.js';
// import { protect } from '../middleware/authMiddleware.js';
// import { admin } from '../middleware/adminMiddleware.js';

// router.route('/').get(getSlides).post(protect, admin, createSlide);
// router.route('/:id').delete(protect, admin, deleteSlide);

// export default router;

import express from 'express';
const router = express.Router();
import {
  getSlides,
  createSlide,
  deleteSlide,
} from '../controllers/carouselController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js'; // ✅ Import Cloudinary upload

// Fetch slides (public)
router.route('/').get(getSlides);

// Admin: upload new slide
// router.route('/')
//   .post(protect, admin, upload.single('image'), createSlide);

router.route('/').post(protect, admin, createSlide);


// Delete slide
router.route('/:id').delete(protect, admin, deleteSlide);

export default router;
