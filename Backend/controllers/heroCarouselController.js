import asyncHandler from 'express-async-handler';
import HeroSlide from '../models/heroSlideModel.js';
import { cloudinary } from '../middleware/uploadMiddleware.js';

// @desc    Get all hero slides
// @route   GET /api/hero-carousel
// @access  Public
const getHeroSlides = asyncHandler(async (req, res) => {
  const slides = await HeroSlide.find({}).sort({ createdAt: -1 });
  res.json(slides);
});

// @desc    Create a new hero slide (with Cloudinary upload)
// @route   POST /api/hero-carousel
// @access  Private/Admin
const createHeroSlide = asyncHandler(async (req, res) => {
  // Check if file was uploaded
  if (!req.file || !req.file.path) {
    res.status(400);
    throw new Error('Image upload failed');
  }

  const { headline, caption, link } = req.body;

  // Create slide with Cloudinary URL
  const slide = new HeroSlide({
    image: req.file.path,  // Cloudinary URL
    cloudinaryId: req.file.filename, // Store cloudinary public_id for deletion
    headline,
    caption,
    link,
  });

  const createdSlide = await slide.save();
  res.status(201).json(createdSlide);
});

// @desc    Delete a hero slide (and remove from Cloudinary)
// @route   DELETE /api/hero-carousel/:id
// @access  Private/Admin
const deleteHeroSlide = asyncHandler(async (req, res) => {
  const slide = await HeroSlide.findById(req.params.id);
  
  if (!slide) {
    res.status(404);
    throw new Error('Hero slide not found');
  }

  // Delete image from Cloudinary if cloudinaryId exists
  if (slide.cloudinaryId) {
    try {
      await cloudinary.uploader.destroy(slide.cloudinaryId);
    } catch (error) {
      console.error('Cloudinary deletion error:', error);
      // Continue with DB deletion even if Cloudinary fails
    }
  }

  await HeroSlide.deleteOne({ _id: slide._id });
  res.json({ message: 'Hero slide removed successfully' });
});

export { getHeroSlides, createHeroSlide, deleteHeroSlide };