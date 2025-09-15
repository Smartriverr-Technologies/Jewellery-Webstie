import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Product from '../models/Product.js'; // <-- THIS IMPORT IS LIKELY MISSING
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    passwordHash: password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get all users (Admin)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user (Admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.role === 'admin') {
      res.status(400);
      throw new Error('Cannot delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user's wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getUserWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const wishlistProducts = await Product.find({
      '_id': { $in: user.wishlist }
    });
    res.json(wishlistProducts);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Add item to wishlist
// @route   POST /api/users/wishlist
// @access  Private
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    const updatedUser = await User.findById(req.user._id).populate('wishlist');
    res.json(updatedUser.wishlist);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Remove item from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.user._id);

  if (user) {
    user.wishlist.pull(productId);
    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('wishlist');
    res.json(updatedUser.wishlist);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
};