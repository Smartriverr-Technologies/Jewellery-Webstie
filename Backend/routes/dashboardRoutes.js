import express from 'express';
const router = express.Router();
import { getDashboardStats } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

router.route('/stats').get(protect, admin, getDashboardStats);

export default router;