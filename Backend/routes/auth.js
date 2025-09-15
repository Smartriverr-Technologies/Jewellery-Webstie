const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_for_production';
const JWT_EXPIRES_IN = '2h'; // change as needed

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ name, email, passwordHash, role: role || 'customer' });
    await user.save();

    // return minimal user info
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const payload = { id: user._id, role: user.role, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return token and user (without password)
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route - get current user
router.get('/me', async (req, res) => {
  try {
    // token parsed by auth middleware that sets req.user
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('Get /me error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
