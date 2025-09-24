import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  sortOrder: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;