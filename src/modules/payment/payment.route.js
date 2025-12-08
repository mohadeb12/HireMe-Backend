import express from 'express';
import * as paymentController from './payment.controller.js';
import auth from '../../middlewares/auth.middleware.js';
import requireRole from '../../middlewares/role.middleware.js';
import { ROLES } from '../../utils/constants.js';

const router = express.Router();

router.use(auth, requireRole(ROLES.ADMIN));

router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);

export default router;