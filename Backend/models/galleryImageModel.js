import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'Jewellery Collection',
    },
    altText: {
      type: String,
      required: true,
      default: 'Image of Aura Jewels jewellery collection',
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);
export default GalleryImage;