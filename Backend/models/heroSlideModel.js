import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema({
  image: { type: String, required: true },
  headline: { type: String },
  caption: { type: String },
  link: { type: String },
}, {
  timestamps: true,
});

const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);
export default HeroSlide;