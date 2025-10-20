

import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure CloudinaryStorage for images
// const imageStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'AuraJewels/hero-carousel',
//     allowed_formats: ['jpeg', 'png', 'jpg', 'gif', 'webp'],
//     resource_type: 'image',
//     transformation: [{ width: 1920, height: 1080, crop: 'limit', quality: 'auto' }]
//   },
// });

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: req.body.folder || 'AuraJewels/general',
    allowed_formats: ['jpeg', 'png', 'jpg', 'gif', 'webp'],
    resource_type: 'image',
    transformation: [{ width: 1920, height: 1080, crop: 'limit', quality: 'auto' }],
  }),
});


// Configure CloudinaryStorage for videos (for future use)
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'AuraJewels/videos',
    allowed_formats: ['mp4', 'mov', 'avi', 'mkv'],
    resource_type: 'video',
  },
});

// Create upload middleware for images
const upload = multer({ 
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Create upload middleware for videos
const uploadVideo = multer({ 
  storage: videoStorage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

export { upload, uploadVideo, cloudinary };