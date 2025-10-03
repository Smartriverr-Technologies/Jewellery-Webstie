import express from 'express';
const router = express.Router();
import { getSettings, updateSettings } from '../controllers/settingController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getSettings).put(protect, updateSettings);
export default router;