// import express from 'express';
// const router = express.Router();
// import { getHeroSlides, createHeroSlide, deleteHeroSlide } from '../controllers/heroCarouselController.js';
// import { protect } from '../middleware/authMiddleware.js';
// import { admin } from '../middleware/adminMiddleware.js';

// router.route('/').get(getHeroSlides).post(protect, admin, createHeroSlide);
// router.route('/:id').delete(protect, admin, deleteHeroSlide);

// export default router;

// import express from 'express';
// const router = express.Router();
// import {
//   getHeroSlides,
//   createHeroSlide,
//   deleteHeroSlide,
// } from '../controllers/heroCarouselController.js';
// import { protect } from '../middleware/authMiddleware.js';
// import { admin } from '../middleware/adminMiddleware.js';
// import { upload } from '../middleware/uploadMiddleware.js'; // 👈 import kiya

// router
//   .route('/')
//   .get(getHeroSlides)
//   // 👇 yahan upload.single('image') add kiya
//   .post(protect, admin, upload.single('image'), createHeroSlide);

// router.route('/:id').delete(protect, admin, deleteHeroSlide);

// export default router;

import express from 'express';
const router = express.Router();
import {
  getHeroSlides,
  createHeroSlide,
  deleteHeroSlide,
} from '../controllers/heroCarouselController.js';
import { protect } from '../middleware/authMiddleware.js'; // Assuming you have these
import { admin } from '../middleware/adminMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';// Assuming you have these

// REMOVED: No longer need to import the upload middleware here
// import { upload } from '../middleware/uploadMiddleware.js';

router
  .route('/')
  .get(getHeroSlides)
  // REMOVED: upload.single('image') is gone from this chain
  // .post(protect, admin, createHeroSlide);
  .post(protect, admin, upload.single('image'), createHeroSlide); 

router.route('/:id').delete(protect, admin, deleteHeroSlide);

export default router;