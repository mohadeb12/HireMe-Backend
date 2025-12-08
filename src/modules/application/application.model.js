import mongoose from 'mongoose';
import { APPLICATION_STATUS, PAYMENT_STATUS } from '../../utils/constants.js';

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    cvUrl: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.PENDING
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.SUCCESS
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment'
    }
  },
  {
    timestamps: true
  }
);

const Application = mongoose.model('Application', applicationSchema);

export default Application;