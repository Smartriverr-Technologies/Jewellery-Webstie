import asyncHandler from 'express-async-handler';
import CarouselSlide from '../models/carouselSlideModel.js';

// @desc    Get all carousel slides
// @route   GET /api/carousel
// @access  Public
const getSlides = asyncHandler(async (req, res) => {
  const location = req.query.location || 'main';
  const filter = location === 'all' ? {} : { location };
  const slides = await CarouselSlide.find(filter).sort({ sortOrder: 1 });
  res.json(slides);
});

// @desc    Create a new slide
// @route   POST /api/carousel
// @access  Private/Admin
const createSlide = asyncHandler(async (req, res) => {
  const { image, headline, caption, link, location } = req.body;

  if (!image) {
    res.status(400);
    throw new Error('Image URL is required');
  }

  const slide = new CarouselSlide({
    image,
    headline,
    caption,
    link,
    location,
  });
  const createdSlide = await slide.save();
  res.status(201).json(createdSlide);
});

// @desc    Delete a slide
// @route   DELETE /api/carousel/:id
// @access  Private/Admin
const deleteSlide = asyncHandler(async (req, res) => {
  const slide = await CarouselSlide.findById(req.params.id);
  if (slide) {
    await CarouselSlide.deleteOne({ _id: slide._id });
    res.json({ message: 'Slide removed' });
  } else {
    res.status(404);
    throw new Error('Slide not found');
  }
});

export { getSlides, createSlide, deleteSlide };