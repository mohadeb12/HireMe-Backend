import mongoose from 'mongoose';
import { JOB_STATUS } from '../../utils/constants.js';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    location: {
      type: String,
      required: true
    },
    salaryRange: {
      type: String
    },
    status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.OPEN
    }
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model('Job', jobSchema);

export default Job;