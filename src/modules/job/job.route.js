import express from 'express';
import * as jobController from './job.controller.js';
import auth from '../../middlewares/auth.middleware.js';
import requireRole from '../../middlewares/role.middleware.js';
import validate from '../../middlewares/validate.middleware.js';
import { ROLES } from '../../utils/constants.js';
import { createJobSchema, updateJobSchema } from './job.validation.js';

const router = express.Router();

router.get('/', jobController.getAllJobs);

router.get(
  '/my',
  auth,
  requireRole(ROLES.EMPLOYER),
  jobController.getMyJobs
);

router.get('/:id', jobController.getJobById);

router.post(
  '/',
  auth,
  requireRole(ROLES.EMPLOYER),
  validate(createJobSchema),
  jobController.createJob
);

router.patch(
  '/:id',
  auth,
  requireRole(ROLES.EMPLOYER),
  validate(updateJobSchema),
  jobController.updateJob
);

router.delete(
  '/:id',
  auth,
  requireRole(ROLES.EMPLOYER),
  jobController.deleteJob
);

export default router;