import express from 'express';
import authRoutes from '../modules/auth/auth.route.js';
import userRoutes from '../modules/user/user.route.js';
import jobRoutes from '../modules/job/job.route.js';
import applicationRoutes from '../modules/application/application.route.js';
import paymentRoutes from '../modules/payment/payment.route.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/payments', paymentRoutes);

export default router;