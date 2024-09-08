import mongoose from 'mongoose';
import { phoneNumberRegex } from '../constants/constants.js';

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: function(v) {
          return phoneNumberRegex.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  lastLoginAttempt: {
    type: Date,
    default: Date.now(),
  }
});

export default userSchema;