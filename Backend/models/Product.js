// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  sku: { type: String },
  title: String,
  price: { type: Number, required: true, default: 0 },
  compareAtPrice: Number,
  stock: { type: Number, default: 0 },
  attributes: { type: Map, of: String } // e.g., metal:gold, size:7
}, { _id: true });

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  alt: String,
  order: Number
}, { _id: false });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  shortDescription: String,
  category: String,
  collections: [String],
  images: [imageSchema],
  variants: [variantSchema],
  price: { type: Number, required: true, default: 0 }, // base price
  currency: { type: String, default: 'INR' },
  tags: [String],
  attributes: { type: Map, of: String },
  active: { type: Boolean, default: true },
  isLatest: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Category',
  required: true,
},

  //  category: {
  //   type: String,
  //   required: true,
  //   enum: [ // This enforces that the category must be one of these values
  //     'Rings',
  //     'Chains',
  //     'Lockets',
  //     'Bracelets',
  //     'Earrings',
  //     'Pendants',
  //     'Solitaires',
  //     'Jewelry Watches',
  //     'Mangalsutras',
  //     'Nosepins',
  //     'Bangles',
  //     'Kada'
  //   ]
  // },
}, { timestamps: true });

// text index for search
productSchema.index({ title: 'text', description: 'text', tags: 'text' });

// module.exports = mongoose.model('Product', productSchema);
const Product = mongoose.model('Product', productSchema);
export default Product;
