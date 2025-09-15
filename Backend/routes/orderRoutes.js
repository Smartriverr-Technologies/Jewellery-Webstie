import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/orderController.js';

// --- Import Middlewares ---
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js'; // <-- The missing import

// --- Route Definitions ---
router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders); // Admin gets all orders

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;