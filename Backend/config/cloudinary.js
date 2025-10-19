// File: Backend/config/cloudinary.js

// import cloudinary from 'cloudinary';
//  // This is the corrected import
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({ // Use cloudinary.v2.config() here
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary.v2; // Export the configured v2 object