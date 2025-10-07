// import asyncHandler from 'express-async-handler';
// import HeroSlide from '../models/heroSlideModel.js';

// // @desc    Get all hero slides
// // @route   GET /api/hero-carousel
// // @access  Public
// const getHeroSlides = asyncHandler(async (req, res) => {
//   const slides = await HeroSlide.find({});
//   res.json(slides);
// });

// // @desc    Create a new hero slide
// // @route   POST /api/hero-carousel
// // @access  Private/Admin
// const createHeroSlide = asyncHandler(async (req, res) => {
//   const { image, headline, caption, link } = req.body;
//   if (!image) {
//     res.status(400);
//     throw new Error('Image URL is required');
//   }
//   const slide = new HeroSlide({ image, headline, caption, link });
//   const createdSlide = await slide.save();
//   res.status(201).json(createdSlide);
// });

// // @desc    Delete a hero slide
// // @route   DELETE /api/hero-carousel/:id
// // @access  Private/Admin
// const deleteHeroSlide = asyncHandler(async (req, res) => {
//   const slide = await HeroSlide.findById(req.params.id);
//   if (slide) {
//     await HeroSlide.deleteOne({ _id: slide._id });
//     res.json({ message: 'Hero slide removed' });
//   } else {
//     res.status(404);
//     throw new Error('Hero slide not found');
//   }
// });

// export { getHeroSlides, createHeroSlide, deleteHeroSlide };


// import asyncHandler from 'express-async-handler';
// import HeroSlide from '../models/heroSlideModel.js';
// import { cloudinary } from '../middleware/uploadMiddleware.js';

// // @desc    Get all hero slides
// // @route   GET /api/hero-carousel
// // @access  Public
// const getHeroSlides = asyncHandler(async (req, res) => {
//   const slides = await HeroSlide.find({}).sort({ createdAt: -1 });
//   res.json(slides);
// });

// // @desc    Create a new hero slide (with Cloudinary upload)
// // @route   POST /api/hero-carousel
// // @access  Private/Admin
// const createHeroSlide = asyncHandler(async (req, res) => {
//   // Check if file was uploaded
//   if (!req.file || !req.file.path) {
//     res.status(400);
//     throw new Error('Image upload failed');
//   }

//   const { headline, caption, link } = req.body;

//   // Create slide with Cloudinary URL
//   const slide = new HeroSlide({
//     image: req.file.path,  // Cloudinary URL
//     cloudinaryId: req.file.filename, // Store cloudinary public_id for deletion
//     headline,
//     caption,
//     link,
//   });

//   const createdSlide = await slide.save();
//   res.status(201).json(createdSlide);
// });

// // @desc    Delete a hero slide (and remove from Cloudinary)
// // @route   DELETE /api/hero-carousel/:id
// // @access  Private/Admin
// const deleteHeroSlide = asyncHandler(async (req, res) => {
//   const slide = await HeroSlide.findById(req.params.id);
  
//   if (!slide) {
//     res.status(404);
//     throw new Error('Hero slide not found');
//   }

//   // Delete image from Cloudinary if cloudinaryId exists
//   if (slide.cloudinaryId) {
//     try {
//       await cloudinary.uploader.destroy(slide.cloudinaryId);
//     } catch (error) {
//       console.error('Cloudinary deletion error:', error);
//       // Continue with DB deletion even if Cloudinary fails
//     }
//   }

//   await HeroSlide.deleteOne({ _id: slide._id });
//   res.json({ message: 'Hero slide removed successfully' });
// });

// export { getHeroSlides, createHeroSlide, deleteHeroSlide };

import asyncHandler from 'express-async-handler';
import HeroSlide from '../models/heroSlideModel.js';
// UPDATED: Import directly from the config for better separation of concerns
import cloudinary from '../config/cloudinary.js'; 

// @desc    Get all hero slides
// @route   GET /api/hero-carousel
// @access  Public
const getHeroSlides = asyncHandler(async (req, res) => {
  const slides = await HeroSlide.find({}).sort({ createdAt: -1 });
  res.json(slides);
});

// @desc    Create a new hero slide
// @route   POST /api/hero-carousel
// @access  Private/Admin
// --- THIS FUNCTION IS THE MAIN CHANGE ---
const createHeroSlide = asyncHandler(async (req, res) => {
  // We no longer look for req.file. Instead, we get the data from the body.
  const { headline, caption, link, image, cloudinaryId } = req.body;

  // Add validation for the new required fields
  if (!image || !cloudinaryId) {
    res.status(400);
    throw new Error('Image URL and Cloudinary ID are required');
  }

  const slide = new HeroSlide({
    headline,
    caption,
    link,
    image, // The Cloudinary URL from req.body
    cloudinaryId, // The Cloudinary public_id from req.body
  });

  const createdSlide = await slide.save();
  res.status(201).json(createdSlide);
});


// @desc    Delete a hero slide (and remove from Cloudinary)
// @route   DELETE /api/hero-carousel/:id
// @access  Private/Admin
// --- NO LOGIC CHANGE NEEDED HERE, IT'S ALREADY PERFECT ---
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
      // Optional: decide if you want to stop or continue if Cloudinary fails
    }
  }

  await HeroSlide.deleteOne({ _id: slide._id });
  res.json({ message: 'Hero slide removed successfully' });
});

export { getHeroSlides, createHeroSlide, deleteHeroSlide };