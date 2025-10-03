import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  // verifyEmail,
  getUsers,
  deleteUser,
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
  forgotPassword,
  resetPassword,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

// --- Auth & Verification Routes ---
router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/verifyemail/:token', verifyEmail);

// --- Password Reset Routes ---
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

// --- Wishlist Routes (Protected) ---
router.route('/wishlist')
  .get(protect, getUserWishlist)
  .post(protect, addToWishlist);
router.route('/wishlist/:productId')
  .delete(protect, removeFromWishlist);

// --- Admin-Only User Management Routes (Protected & Admin) ---
router.route('/')
  .get(protect, admin, getUsers);
router.route('/:id')
  .delete(protect, admin, deleteUser);

export default router;