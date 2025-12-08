import * as paymentService from './payment.service.js';

export const getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.json({
      success: true,
      data: payments
    });
  } catch (err) {
    next(err);
  }
};

export const getPaymentById = async (req, res, next) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    if (!payment) {
      const error = new Error('Payment not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      success: true,
      data: payment
    });
  } catch (err) {
    next(err);
  }
};