import asyncHandler from 'express-async-handler';
import GalleryImage from '../models/galleryImageModel.js';
import fs from 'fs';
import path from 'path';
//test
// @desc    Fetch all gallery images
const getGalleryImages = asyncHandler(async (req, res) => {
  const images = await GalleryImage.find({}).sort({ createdAt: -1 });
  res.json(images);
});

// @desc    Upload a new gallery image
// @route   POST /api/gallery
// @access  Private/Admin
const uploadGalleryImage = asyncHandler(async (req, res) => {
  if (req.file) {
    const newImage = new GalleryImage({
      imageUrl: `/uploads/${req.file.filename}`,
    });
    const createdImage = await newImage.save();
    res.status(201).json(createdImage);
  } else {
    res.status(400);
    throw new Error('No image file provided or invalid file type');
  }
});

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryImage = asyncHandler(async (req, res) => {
  const image = await GalleryImage.findById(req.params.id);

  if (image) {
    const __dirname = path.resolve();
    // Construct the full path to the image file
    const imagePath = path.join(__dirname, 'uploads', path.basename(image.imageUrl));
    
    // Asynchronously delete the file from the server
    fs.unlink(imagePath, (err) => {
      if (err) console.error(`Failed to delete image file: ${imagePath}`, err);
    });

    await GalleryImage.deleteOne({ _id: image._id });
    res.json({ message: 'Image removed' });
  } else {
    res.status(404);
    throw new Error('Image not found');
  }
});

export { getGalleryImages, uploadGalleryImage, deleteGalleryImage };