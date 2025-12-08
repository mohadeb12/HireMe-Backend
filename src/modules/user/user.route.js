import express from 'express';
import auth from '../../middlewares/auth.middleware.js';
import requireRole from '../../middlewares/role.middleware.js';
import validate from '../../middlewares/validate.middleware.js';
import { ROLES } from '../../utils/constants.js';
import * as userController from './user.controller.js';
import { createUserSchema, updateUserSchema } from './user.validation.js';

const router = express.Router();

router.use(auth, requireRole(ROLES.ADMIN));

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validate(createUserSchema), userController.createUser);
router.patch('/:id', validate(updateUserSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;