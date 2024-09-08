import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema.js';

const User = mongoose.model('User', userSchema, null, {
  timestamps: true,
});

export default User;
