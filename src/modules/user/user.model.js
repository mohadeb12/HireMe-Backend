import mongoose from 'mongoose';
import { ROLES } from '../../utils/constants.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.JOB_SEEKER
    },
    companyName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;