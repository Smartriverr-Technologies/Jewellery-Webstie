import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductBySlug,
  getProductById,
  getProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

// --- Admin-Only Routes (Specific routes come first) ---
router.route('/admin').get(protect, admin, getProductsAdmin);

// --- Public Routes ---
router.route('/').get(getProducts).post(protect, admin, createProduct);

// GET /api/products/slug/:slug - For customers (Now specific)
router.route('/slug/:slug').get(getProductBySlug);

// --- Routes by ID (Dynamic, come last) ---
// This will now correctly handle requests for /api/products/some-id
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;