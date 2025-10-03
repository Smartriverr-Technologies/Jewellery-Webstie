import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/orderModel.js';
import Category from '../models/categoryModel.js';

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  // Promise.all se hum saare database calls ek saath karenge for better performance
  const [
    userCount,
    productCount,
    orderCount,
    pendingOrderCount,
    categoryCount,
    revenueData
  ] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
    Order.countDocuments({ isDelivered: false }),
    Category.countDocuments(),
    Order.aggregate([
      { $match: { isDelivered: true } }, // Sirf delivered orders
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
    ])
  ]);

  const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

  res.json({
    users: userCount,
    products: productCount,
    orders: orderCount,
    pendingOrders: pendingOrderCount,
    categories: categoryCount,
    totalRevenue: totalRevenue
  });
});

export { getDashboardStats };