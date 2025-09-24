import asyncHandler from 'express-async-handler';
import Testimonial from '../models/testimonialModel.js';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({}).sort({ sortOrder: 1 });
  res.json(testimonials);
});

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
const createTestimonial = asyncHandler(async (req, res) => {
  const { name, comment, imageUrl, rating } = req.body;
  const testimonial = new Testimonial({ name, comment, imageUrl, rating });
  const createdTestimonial = await testimonial.save();
  res.status(201).json(createdTestimonial);
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (testimonial) {
    await Testimonial.deleteOne({ _id: testimonial._id });
    res.json({ message: 'Testimonial removed' });
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
});

export { getTestimonials, createTestimonial, deleteTestimonial };