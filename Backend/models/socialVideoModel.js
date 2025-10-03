import mongoose from 'mongoose';

const socialVideoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  hashtag: { type: String, required: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

const SocialVideo = mongoose.model('SocialVideo', socialVideoSchema);
export default SocialVideo;