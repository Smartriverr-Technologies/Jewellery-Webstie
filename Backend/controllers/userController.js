import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import User from '../models/User.js';
import Product from '../models/Product.js';
import generateToken from '../utils/generateToken.js';
// Make sure you have a sendEmail utility configured
import sendEmail from '../utils/sendEmail.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;
//   let user = await User.findOne({ email });

//   if (user && user.isVerified) {
//     res.status(400);
//     throw new Error('User with this email already exists.');
//   }

//   // 1. Generate the original, plain-text token
//   const verificationToken = crypto.randomBytes(20).toString('hex');

//   // 2. Create the hashed token to save securely in the database
//   const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

//   if (user && !user.isVerified) {
//     user.name = name;
//     user.passwordHash = password; // pre-save hook will hash this
//     user.verificationToken = hashedToken;
//     user.verificationTokenExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
//     await user.save();
//   } else {
//     user = await User.create({
//       name, email, passwordHash: password,
//       verificationToken: hashedToken,
//       verificationTokenExpire: Date.now() + 15 * 60 * 1000,
//     });
//   }

//   // 3. Send the ORIGINAL, plain-text token in the email link
//   const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
//   const message = `Thank you for registering! Please verify your email by clicking this link: ${verificationUrl}`;
  
//   try {
//     await sendEmail({ email: user.email, subject: 'Aura Jewels - Email Verification', message });
//     console.log(`Verification Email Sent! Link: ${verificationUrl}`);
//     res.status(201).json({ message: 'Verification email sent. Please check your inbox.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500);
//     throw new Error('Email could not be sent.');
//   }
// });
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

// @desc    Verify user's email
// @route   GET /api/users/verifyemail/:token
// @access  Public
// const verifyEmail = asyncHandler(async (req, res) => {
//   // 1. Hash the incoming plain-text token from the URL
//   const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

//   // 2. Find the user by the HASHED token and check if it has expired
//   const user = await User.findOne({ 
//     verificationToken: hashedToken, 
//     verificationTokenExpire: { $gt: Date.now() }
//   });

//   if (!user) {
//     res.status(400);
//     throw new Error('Invalid or expired verification token.');
//   }

//   user.isVerified = true;
//   user.verificationToken = undefined;
//   user.verificationTokenExpire = undefined;
//   await user.save();

//   res.json({ message: 'Email verified successfully. You can now log in.' });
// });

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     if (!user.isVerified) {
//       res.status(401);
//       throw new Error('Please verify your email to log in.');
//     }
    
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
// });

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
    await user.populate('wishlist');
    res.json(user.wishlist);
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
    await user.populate('wishlist');
    res.json(user.wishlist);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Forgot password
// @route   POST /api/users/forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    // Logic to handle forgot password request
});

// @desc    Reset password
// @route   PUT /api/users/resetpassword/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    // Logic to handle reset password
});

export {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
  forgotPassword,
  resetPassword,
  // verifyEmail,
   // If you implement OTP verification
};