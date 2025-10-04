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
import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// A single route for all file uploads
router.post('/', protect, admin, upload.single('file'), (req, res) => {
  if (req.file) {
    res.status(200).send({
      message: 'File uploaded successfully',
      url: req.file.path, // Cloudinary provides a full, public URL
    });
  } else {
    res.status(400).send({ message: 'No file uploaded or invalid file type' });
  }
});

export default router;