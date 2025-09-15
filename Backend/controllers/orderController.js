import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  // Populate the user field to get the user's name
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // Transform the items from the cart to match the order schema
    const transformedOrderItems = orderItems.map(item => ({
      name: item.title,
      qty: item.qty,
      image: item.images[0].url,
      price: item.price,
      product: item._id,
    }));

    const order = new Order({
      orderItems: transformedOrderItems,
      user: req.user._id, // Get user from the protect middleware
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // Also get the user's name and email associated with the order
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export { addOrderItems, getOrderById, getMyOrders , getOrders,
  updateOrderToDelivered, }