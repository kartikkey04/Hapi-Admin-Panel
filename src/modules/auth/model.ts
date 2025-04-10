import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['super-admin', 'sub-admin'], default: 'sub-admin' }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
