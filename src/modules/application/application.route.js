import express from 'express';
import auth from '../../middlewares/auth.middleware.js';
import requireRole from '../../middlewares/role.middleware.js';
import upload from '../../middlewares/upload.middleware.js';
import validate from '../../middlewares/validate.middleware.js';
import { ROLES } from '../../utils/constants.js';
import * as applicationController from './application.controller.js';
import { updateStatusSchema } from './application.validation.js';

const router = express.Router();

router.post(
  '/jobs/:jobId/apply',
  auth,
  requireRole(ROLES.JOB_SEEKER),
  upload.single('cv'),
  applicationController.applyToJob
);

router.get(
  '/my',
  auth,
  requireRole(ROLES.JOB_SEEKER),
  applicationController.getMyApplications
);

router.get(
  '/job/:jobId',
  auth,
  requireRole(ROLES.EMPLOYER, ROLES.ADMIN),
  applicationController.getApplicationsForJob
);

router.patch(
  '/:id/status',
  auth,
  requireRole(ROLES.EMPLOYER, ROLES.ADMIN),
  validate(updateStatusSchema),
  applicationController.updateApplicationStatus
);

export default router;