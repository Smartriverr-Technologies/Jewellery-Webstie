// import mongoose from 'mongoose';

// const galleryImageSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       default: 'Jewellery Collection',
//     },
//     altText: {
//       type: String,
//       required: true,
//       default: 'Image of Aura Jewels jewellery collection',
//     },
//     imageUrl: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);
// export default GalleryImage;

import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // default: 'Jewellery Collection',
    },
    altText: {
      type: String,
      // default: 'Image of Aura Jewels jewellery collection',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String, // ✅ Cloudinary Public ID
    },
  },
  {
    timestamps: true,
  }
);

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);
export default GalleryImage;
