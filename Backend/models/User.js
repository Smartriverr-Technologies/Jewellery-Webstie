// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// const bcrypt = require('bcryptjs'); 
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
  label: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  phone: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  // isVerified: { type: Boolean, default: false },
  // otp: { type: String },
  // otpExpire: { type: Date },
  //  verificationTokenExpire: { type: Date }, 
  role: { type: String, enum: ['customer','admin','superadmin'], default: 'customer' },
  addresses: [addressSchema],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Method to compare entered password with the hashed password in the DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Middleware that runs before saving a user document
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('passwordHash')) {
    next();
  }

  // Hash the password with a salt
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

// module.exports = mongoose.model('User', userSchema);
const User = mongoose.model('User', userSchema);
export default User;
