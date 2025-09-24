import mongoose from 'mongoose';

const carouselSlideSchema = new mongoose.Schema({
  image: { type: String, required: true },
  headline: { type: String },
  caption: { type: String },
  link: { type: String }, // Optional URL to link to
  sortOrder: { type: Number, default: 0 },
  location: { // <-- ADD THIS FIELD
    type: String,
    required: true,
    enum: ['hero', 'main'], // Only allows these two values
    default: 'main',
  },
}, {
  timestamps: true,
});

const CarouselSlide = mongoose.model('CarouselSlide', carouselSlideSchema);

export default CarouselSlide;