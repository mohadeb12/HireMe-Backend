import express from 'express';
import * as authController from './auth.controller.js';
import validate from '../../middlewares/validate.middleware.js';
import auth from '../../middlewares/auth.middleware.js';
import { registerSchema, loginSchema } from './auth.validation.js';

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', auth, authController.getMe);

export default router;