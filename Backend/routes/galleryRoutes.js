// import express from 'express';
// const router = express.Router();
// import {
//   getGalleryImages,
//   uploadGalleryImage,
//   deleteGalleryImage,
// } from '../controllers/galleryController.js';
// import { protect } from '../middleware/authMiddleware.js';
// import { admin } from '../middleware/adminMiddleware.js';
// import { upload } from '../middleware/uploadMiddleware.js';

// router.route('/')
//   .get(getGalleryImages)
//   .post(protect, admin, upload.single('media'), uploadGalleryImage);

// router.route('/:id')
//   .delete(protect, admin, deleteGalleryImage);

// export default router;

import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  uploadGalleryImage,
  getGalleryImages,
  deleteGalleryImage,
} from '../controllers/galleryController.js';

const router = express.Router();

router.get('/', getGalleryImages);
router.post('/upload', upload.single('image'), uploadGalleryImage);
router.delete('/:id', deleteGalleryImage);

export default router;
