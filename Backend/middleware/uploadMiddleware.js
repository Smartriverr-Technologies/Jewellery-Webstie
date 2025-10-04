// import multer from 'multer';
// import path from 'path';

// // Configure storage options for Multer
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/'); // The folder where files will be stored
//   },
//   filename(req, file, cb) {
//     // Create a unique filename to avoid overwrites
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// // Function to check if the uploaded file is an image
// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Images only! (jpg, jpeg, png)'), false);
//   }
// }

// // Initialize Multer with the storage and file filter configurations
// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });


// const videoStorage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `video-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// function checkVideoType(file, cb) {
//   const filetypes = /mp4|mov|avi|mkv/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = file.mimetype.startsWith('video');
//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Videos only!'), false);
//   }
// }

// const uploadVideo = multer({
//   storage: videoStorage,
//   fileFilter: function (req, file, cb) {
//     checkVideoType(file, cb);
//   },
// });
// export { upload , uploadVideo };


// for production
// import { v2 as cloudinary } from 'cloudinary';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary with your credentials from the .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'AuraJewels', // A folder name to organize files in your Cloudinary account
    allowed_formats: ['jpeg', 'png', 'jpg', 'gif', 'mp4', 'mov', 'avi'], // Allowed formats
    resource_type: 'auto', // Automatically detect if it's an image or video
  },
});

// Create the upload middleware
const upload = multer({ storage: storage });

export { upload };