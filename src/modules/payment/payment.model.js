import mongoose from 'mongoose';
import { PAYMENT_STATUS } from '../../utils/constants.js';

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application'
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'BDT'
    },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.SUCCESS
    },
    transactionId: {
      type: String,
      required: true,
      unique: true
    },
    paidAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;