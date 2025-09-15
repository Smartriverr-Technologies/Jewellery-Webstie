const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_for_production';

module.exports = function (req, res, next) {
  // Look for token in Authorization header: "Bearer <token>"
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // payload contains { id, role, email }
    next();
  } catch (err) {
    console.error('auth middleware error', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
