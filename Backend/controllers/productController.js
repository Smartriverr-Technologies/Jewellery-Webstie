import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc    Fetch all active products for customers
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ active: true });
  res.json(products);
});

// @desc    Fetch a single product by slug for customers
// @route   GET /api/products/slug/:slug
// @access  Public
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get a single product by ID for admin
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get all products (Admin)
// @route   GET /api/products/admin
// @access  Private/Admin
const getProductsAdmin = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    title: 'Sample Name',
    slug: `sample-name-${Date.now()}`,
    price: 0,
    user: req.user._id,
    images: [{ url: '/images/sample.jpg', alt: 'sample image' }],
    category: 'Sample Category',
    variants: [{ sku: 'SAMPLE-SKU', title: 'Default', price: 0, stock: 0 }],
    description: 'Sample description',
    active: false,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { title, price, description, images, category, variants, active } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.title = title;
    product.price = price;
    product.description = description;
    product.images = images;
    product.category = category;
    product.variants = variants;
    product.active = active;
    // Note: You might want to add logic to auto-generate a new slug if the title changes.
    // product.slug = title.toLowerCase().split(' ').join('-');

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductBySlug,
  getProductById,
  getProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
};