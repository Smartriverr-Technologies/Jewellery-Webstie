// import mongoose from 'mongoose';

// const heroSlideSchema = new mongoose.Schema({
//   image: { type: String, required: true },
//   headline: { type: String },
//   caption: { type: String },
//   link: { type: String },
// }, {
//   timestamps: true,
// });

// const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);
// export default HeroSlide;

//claude code
import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema({
  image: { 
    type: String, 
    required: true 
  },
  cloudinaryId: {
    type: String, // Store Cloudinary public_id for deletion
  },
  headline: { 
    type: String,
    default: '' 
  },
  caption: { 
    type: String,
    default: '' 
  },
  link: { 
    type: String,
    default: '' 
  },
}, {
  timestamps: true,
});

const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);
export default HeroSlide;