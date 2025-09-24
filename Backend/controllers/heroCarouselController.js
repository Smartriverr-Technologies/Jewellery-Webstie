import asyncHandler from 'express-async-handler';
import HeroSlide from '../models/heroSlideModel.js';

// @desc    Get all hero slides
// @route   GET /api/hero-carousel
// @access  Public
const getHeroSlides = asyncHandler(async (req, res) => {
  const slides = await HeroSlide.find({});
  res.json(slides);
});

// @desc    Create a new hero slide
// @route   POST /api/hero-carousel
// @access  Private/Admin
const createHeroSlide = asyncHandler(async (req, res) => {
  const { image, headline, caption, link } = req.body;
  if (!image) {
    res.status(400);
    throw new Error('Image URL is required');
  }
  const slide = new HeroSlide({ image, headline, caption, link });
  const createdSlide = await slide.save();
  res.status(201).json(createdSlide);
});

// @desc    Delete a hero slide
// @route   DELETE /api/hero-carousel/:id
// @access  Private/Admin
const deleteHeroSlide = asyncHandler(async (req, res) => {
  const slide = await HeroSlide.findById(req.params.id);
  if (slide) {
    await HeroSlide.deleteOne({ _id: slide._id });
    res.json({ message: 'Hero slide removed' });
  } else {
    res.status(404);
    throw new Error('Hero slide not found');
  }
});

export { getHeroSlides, createHeroSlide, deleteHeroSlide };