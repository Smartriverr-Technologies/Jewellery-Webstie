import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  shippingCharge: {
    type: Number,
    required: true,
    default: 50,
  },
  freeShippingThreshold: {
    type: Number,
    required: true,
    default: 500, // Free shipping for orders over $500
  },
});

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;