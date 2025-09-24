import express from 'express';
const router = express.Router();
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryBySlug,
} from '../controllers/categoryController.js';

import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

// GET all categories & POST a new category
router.route('/').get(getCategories).post(protect, admin, createCategory);

// GET a single category by its slug
// This must be defined before the '/:id' route to avoid 'slug' being treated as an ID
router.route('/slug/:slug').get(getCategoryBySlug);

// DELETE, PUT a specific category by its ID
router.route('/:id').delete(protect, admin, deleteCategory).put(protect, admin, updateCategory);

export default router;