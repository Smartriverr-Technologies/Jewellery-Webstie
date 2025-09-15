import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
  getUserWishlist,    // <-- Import this
  addToWishlist,      // <-- Import this
  removeFromWishlist, // <-- Import this
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

// --- Auth & User Management Routes ---
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// Admin-only user list
router.route('/').get(protect, admin, getUsers);

// Admin-only delete user
router.route('/:id').delete(protect, admin, deleteUser);


// --- Wishlist Routes ---
router
  .route('/wishlist')
  .get(protect, getUserWishlist)
  .post(protect, addToWishlist);

router
  .route('/wishlist/:productId')
  .delete(protect, removeFromWishlist);


export default router;