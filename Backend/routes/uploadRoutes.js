import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  if (req.file) {
    // Respond with the path to the uploaded file
    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path.replace(/\\/g, '/')}`, // Format path for URL
    });
  } else {
    res.status(400).send({ message: 'No file uploaded or invalid file type' });
  }
});

export default router;