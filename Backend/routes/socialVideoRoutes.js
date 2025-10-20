import express from 'express';
const router = express.Router();
import { getSocialVideos, createSocialVideo, deleteSocialVideo } from '../controllers/socialVideoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import { uploadVideo } from '../middleware/uploadMiddleware.js';

router.route('/').get(getSocialVideos).post(protect, admin,uploadVideo.single('video'), createSocialVideo);
router.route('/:id').delete(protect, admin, deleteSocialVideo);

export default router;