// import express from 'express';
// const router = express.Router();
// import { getHeroSlides, createHeroSlide, deleteHeroSlide } from '../controllers/heroCarouselController.js';
// import { protect } from '../middleware/authMiddleware.js';
// import { admin } from '../middleware/adminMiddleware.js';

// router.route('/').get(getHeroSlides).post(protect, admin, createHeroSlide);
// router.route('/:id').delete(protect, admin, deleteHeroSlide);

// export default router;

import express from 'express';
const router = express.Router();
import {
  getHeroSlides,
  createHeroSlide,
  deleteHeroSlide,
} from '../controllers/heroCarouselController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js'; // 👈 import kiya

router
  .route('/')
  .get(getHeroSlides)
  // 👇 yahan upload.single('image') add kiya
  .post(protect, admin, upload.single('image'), createHeroSlide);

router.route('/:id').delete(protect, admin, deleteHeroSlide);

export default router;
