import Payment from './payment.model.js';
import { PAYMENT_STATUS } from '../../utils/constants.js';

export const fakeCharge = async ({ userId, jobId, amount }) => {
  const transactionId = 'TXN-' + Date.now() + '-' + Math.round(Math.random() * 1e9);
  const payment = await Payment.create({
    user: userId,
    job: jobId,
    amount,
    status: PAYMENT_STATUS.SUCCESS,
    transactionId
  });
  return payment;
};

export const attachApplicationToPayment = async (paymentId, applicationId) => {
  const payment = await Payment.findByIdAndUpdate(
    paymentId,
    { application: applicationId },
    { new: true }
  );
  return payment;
};

export const getAllPayments = async () => {
  const payments = await Payment.find()
    .populate('user', 'name email role')
    .populate('job', 'title companyName')
    .populate('application');
  return payments;
};

export const getPaymentById = async id => {
  const payment = await Payment.findById(id)
    .populate('user', 'name email role')
    .populate('job', 'title companyName')
    .populate('application');
  return payment;
};