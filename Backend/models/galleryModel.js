import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String },
    imageUrl: { type: String, required: true },
    altText: { type: String },
    public_id: { type: String }, // for deleting from Cloudinary
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);
