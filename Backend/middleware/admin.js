module.exports = function (req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Forbidden: admin role required' });
  }
  next();
};
