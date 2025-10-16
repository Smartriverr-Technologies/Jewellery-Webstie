import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Category from '../models/categoryModel.js';

// @desc    Fetch all active products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const { minPrice, maxPrice, sortBy, category } = req.query;

  const filter = { active: true };

  if (category) {
    filter.category = category;
  }
  if (minPrice && maxPrice) {
    filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  }

  const count = await Product.countDocuments(filter);
  let query = Product.find(filter);

  if (sortBy === 'latest') {
    query = query.sort({ createdAt: -1 });
  } else if (sortBy === 'price-asc') {
    query = query.sort({ price: 1 });
  } else if (sortBy === 'price-desc') {
    query = query.sort({ price: -1 });
  }

  const products = await query.limit(pageSize).skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get latest products for homepage
// @route   GET /api/products/latest
// @access  Public
const getLatestProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ active: true, isLatest: true })
      .sort({ createdAt: -1 })
      .limit(8);
    res.json(products);
  });

// @desc    Search for products
// @route   GET /api/products/search
// @access  Public
const searchProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? {
    $text: {
      $search: req.query.keyword,
      $caseSensitive: false
    }
  } : {};
  const products = await Product.find({ ...keyword, active: true });
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

// @desc    Get a single product by ID
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
  const products = await Product.find({}).populate('category');
  res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // Find a default category to assign to the new product
  const defaultCategory = await Category.findOne();
  if (!defaultCategory) {
    res.status(400);
    throw new Error('No categories found. Please add a category before creating a product.');
  }

  const product = new Product({
    title: 'Sample Name',
    slug: `sample-name-${Date.now()}`,
    price: 0,
    user: req.user._id,
    images: [{ url: '/images/sample.jpg', alt: 'sample image' }],
    category: defaultCategory._id, // <-- Use the ID of the default category
    variants: [{ sku: 'SAMPLE-SKU', title: 'Default', price: 0, stock: 0 }],
    description: 'Sample description',
    active: false,
    isLatest: false,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
// const updateProduct = asyncHandler(async (req, res) => {
//   const { title, price, description, images, category, variants, active, isLatest } = req.body;
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     product.title = title;
//     product.price = price;
//     product.description = description;
//     product.images = images;
//     product.category = category;
//     product.variants = variants;
//     product.active = active;
//     product.isLatest = isLatest;
//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   } else {
//     res.status(404);
//     throw new Error('Product not found');
//   }
// });

const updateProduct = asyncHandler(async (req, res) => {
  const { title, price, description, images, category, variants, active, isLatest } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.title = title || product.title;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.variants = variants || product.variants;
    product.active = active ?? product.active;
    product.isLatest = isLatest ?? product.isLatest;

    // ✅ Handle images properly
    if (images && Array.isArray(images)) {
      // Each image should be an object: { url: '...', alt: '...' }
      product.images = images.map(img => ({
        url: img.url || img, // Support plain string URLs or object format
        alt: img.alt || product.title || 'Product image',
      }));
    }

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
  getLatestProducts,
  searchProducts,
  getProductBySlug,
  getProductById,
  getProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
};