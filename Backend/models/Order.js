const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  variantId: mongoose.Schema.Types.ObjectId,
  title: String,
  price: Number,
  qty: Number,
  sku: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [orderItemSchema],
  billing: {
    name: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
    phone: String
  },
  shipping: {
    method: String,
    cost: Number,
    address: Object
  },
  subtotal: Number,
  tax: Number,
  total: Number,
  currency: { type: String, default: 'INR' },
  payment: {
    status: { type: String, enum: ['pending','paid','failed','refunded'], default: 'pending' },
    provider: String,
    providerData: Object
  },
  status: { type: String, enum: ['created','processing','shipped','delivered','cancelled'], default: 'created' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);