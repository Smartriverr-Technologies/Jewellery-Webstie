// import express from 'express';
// const router = express.Router();
// import { upload, uploadVideo } from '../middleware/uploadMiddleware.js';
// import { protect } from '../middleware/authMiddleware.js';
// import { admin } from '../middleware/adminMiddleware.js';

// // --- ROUTE FOR IMAGE UPLOADS ---
// // Handles POST requests to /api/upload
// router.post('/', protect, admin, upload.single('image'), (req, res) => {
//     if (req.file) {
//         res.status(200).send({
//           message: 'Image uploaded successfully',
//           image: `/${req.file.path.replace(/\\/g, '/')}`,
//         });
//     } else {
//         res.status(400).send({ message: 'No image file uploaded or invalid file type' });
//     }
// });

// // --- ROUTE FOR VIDEO UPLOADS ---
// // Handles POST requests to /api/upload/video
// router.post('/video', protect, admin, uploadVideo.single('video'), (req, res) => {
//     if (req.file) {
//         res.status(200).send({
//           message: 'Video uploaded successfully',
//           video: `/${req.file.path.replace(/\\/g, '/')}`,
//         });
//       } else {
//         res.status(400).send({ message: 'No video file uploaded or invalid file type' });
//       }
// });

// export default router;

// for production
// import express from 'express';
// import { upload } from '../middleware/uploadMiddleware.js';
// import { protect } from '../middleware/authMiddleware.js';
// import { admin } from '../middleware/adminMiddleware.js';

// const router = express.Router();

// // A single route for all file uploads
// router.post('/', protect, admin, upload.single('file'), (req, res) => {
//   if (req.file) {
//     res.status(200).send({
//       message: 'File uploaded successfully',
//       url: req.file.path, // Cloudinary provides a full, public URL
//     });
//   } else {
//     res.status(400).send({ message: 'No file uploaded or invalid file type' });
//   }
// });

// export default router;


//claude code
// import express from 'express';
// import { upload, uploadVideo } from '../middleware/uploadMiddleware.js';
// import { protect } from '../middleware/authMiddleware.js';
// import { admin } from '../middleware/adminMiddleware.js';

// const router = express.Router();

// // Single image upload route
// router.post('/', protect, admin, upload.single('media'), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }
    
//     res.status(200).json({
//       message: 'File uploaded successfully',
//       url: req.file.path, // Cloudinary URL
//       publicId: req.file.filename // Cloudinary public_id for deletion
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'File upload failed', error: error.message });
//   }
// });

// // Video upload route (for future use)
// router.post('/video', protect, admin, uploadVideo.single('file'), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No video uploaded' });
//     }
    
//     res.status(200).json({
//       message: 'Video uploaded successfully',
//       url: req.file.path,
//       publicId: req.file.filename
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Video upload failed', error: error.message });
//   }
// });

// export default router;

import express from 'express';
import { upload, uploadVideo } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Image Upload (single or multiple)
router.post('/', protect, admin, upload.array('media', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadedFiles = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
    }));

    res.status(200).json({
      message: 'Files uploaded successfully',
      files: uploadedFiles,
    });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
});

// Video Upload
router.post('/video', protect, admin, uploadVideo.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video uploaded' });
    }
    
    res.status(200).json({
      message: 'Video uploaded successfully',
      url: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: 'Video upload failed', error: error.message });
  }
});

export default router;
