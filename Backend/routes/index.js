// // const router = require('express').Router();
// // const authRoutes = require('./auth');
// // const authMiddleware = require('../middleware/auth');
// // const productRoutes = require('./productRoutes.js'); 
// import productRoutes from './productRoutes.js';
// import authMiddleware from '../middleware/auth.js';
// import authRoutes from './auth.js';
// import express from 'express';
// const router = express.Router();
// import userRoutes from './userRoutes.js';

// // public
// router.get('/ping', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// // auth
// router.use('/auth', authRoutes);

// router.use('/products', productRoutes); 
// router.use('/users', userRoutes); 

// // sample protected route
// router.get('/protected', authMiddleware, (req, res) => {
//   res.json({ ok: true, msg: 'You reached a protected route', user: req.user });
// });

// module.exports = router;

import express from 'express';
import productRoutes from './productRoutes.js';
import userRoutes from './userRoutes.js';
import orderRoutes from './orderRoutes.js';

// We will create the auth routes and middleware in a future step.
// For now, they must be commented out to prevent errors.
// import authRoutes from './auth.js';
// import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// --- Public Routes ---
// A simple route to check if the API is working
router.get('/ping', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// --- Route Definitions ---
// Use the routes for products and users that we have already created
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes); 

// These routes are commented out because we haven't built them yet.
// router.use('/auth', authRoutes);
// router.get('/protected', authMiddleware, (req, res) => {
//   res.json({ ok: true, msg: 'You reached a protected route', user: req.user });
// });

// Use "export default" in ES Modules
export default router;