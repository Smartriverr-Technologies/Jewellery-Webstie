import multer from 'multer';
import path from 'path';

// Configure storage options for Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // The folder where files will be stored
  },
  filename(req, file, cb) {
    // Create a unique filename to avoid overwrites
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Function to check if the uploaded file is an image
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only! (jpg, jpeg, png)'), false);
  }
}

// Initialize Multer with the storage and file filter configurations
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export { upload };