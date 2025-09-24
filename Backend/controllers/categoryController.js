import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import Product from '../models/Product.js';

// @desc    Get all categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// @desc    Get category by slug
const getCategoryBySlug = asyncHandler(async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slug });
    if(category) {
        res.json(category);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

// @desc    Create a new category
const createCategory = asyncHandler(async (req, res) => {
  const { name, image } = req.body;
  const category = new Category({ name, image });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// @desc    Update a category
const updateCategory = asyncHandler(async (req, res) => {
    const { name, image } = req.body;
    const category = await Category.findById(req.params.id);
    if(category) {
        category.name = name || category.name;
        category.image = image || category.image;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});


// @desc    Delete a category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    // Check if any product is using this category
    const products = await Product.find({ category: category._id });
    if (products.length > 0) {
      res.status(400);
      throw new Error('Cannot delete category. It is currently in use by products.');
    }
    await Category.deleteOne({ _id: category._id });
    res.json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

export { getCategories, createCategory, deleteCategory, updateCategory, getCategoryBySlug };