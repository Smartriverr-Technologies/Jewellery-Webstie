// import asyncHandler from 'express-async-handler';
// import CarouselSlide from '../models/carouselSlideModel.js';

// // @desc    Get all carousel slides
// // @route   GET /api/carousel
// // @access  Public
// const getSlides = asyncHandler(async (req, res) => {
//   const location = req.query.location || 'main';
//   const filter = location === 'all' ? {} : { location };
//   const slides = await CarouselSlide.find(filter).sort({ sortOrder: 1 });
//   res.json(slides);
// });

// // @desc    Create a new slide
// // @route   POST /api/carousel
// // @access  Private/Admin
// const createSlide = asyncHandler(async (req, res) => {
//   const { image, headline, caption, link, location } = req.body;

//   if (!image) {
//     res.status(400);
//     throw new Error('Image URL is required');
//   }

//   const slide = new CarouselSlide({
//     image,
//     headline,
//     caption,
//     link,
//     location,
//   });
//   const createdSlide = await slide.save();
//   res.status(201).json(createdSlide);
// });

// // @desc    Delete a slide
// // @route   DELETE /api/carousel/:id
// // @access  Private/Admin
// const deleteSlide = asyncHandler(async (req, res) => {
//   const slide = await CarouselSlide.findById(req.params.id);
//   if (slide) {
//     await CarouselSlide.deleteOne({ _id: slide._id });
//     res.json({ message: 'Slide removed' });
//   } else {
//     res.status(404);
//     throw new Error('Slide not found');
//   }
// });

// export { getSlides, createSlide, deleteSlide };

import asyncHandler from 'express-async-handler';
import CarouselSlide from '../models/carouselSlideModel.js';
import { cloudinary } from '../middleware/uploadMiddleware.js';

// @desc    Get all carousel slides
// @route   GET /api/carousel
// @access  Public
const getSlides = asyncHandler(async (req, res) => {
  const location = req.query.location || 'main';
  const filter = location === 'all' ? {} : { location };
  const slides = await CarouselSlide.find(filter).sort({ sortOrder: 1 });
  res.json(slides);
});

// @desc    Create a new slide (with Cloudinary upload)
// @route   POST /api/carousel
// @access  Private/Admin
const createSlide = asyncHandler(async (req, res) => {
  if (!req.file || !req.file.path) {
    res.status(400);
    throw new Error('Image upload failed');
  }

  const { headline, caption, link, location } = req.body;

  const slide = new CarouselSlide({
    image: req.file.path, // Cloudinary URL
    cloudinaryId: req.file.filename, // Cloudinary public_id
    headline,
    caption,
    link,
    location: location || 'main',
  });

  const createdSlide = await slide.save();
  res.status(201).json(createdSlide);
});

// @desc    Delete a slide (and its Cloudinary image)
// @route   DELETE /api/carousel/:id
// @access  Private/Admin
const deleteSlide = asyncHandler(async (req, res) => {
  const slide = await CarouselSlide.findById(req.params.id);

  if (!slide) {
    res.status(404);
    throw new Error('Slide not found');
  }

  // Delete image from Cloudinary
  if (slide.cloudinaryId) {
    try {
      await cloudinary.uploader.destroy(slide.cloudinaryId);
    } catch (err) {
      console.error('Cloudinary deletion failed:', err);
    }
  }

  await CarouselSlide.deleteOne({ _id: slide._id });
  res.json({ message: 'Slide removed successfully' });
});

export { getSlides, createSlide, deleteSlide };
