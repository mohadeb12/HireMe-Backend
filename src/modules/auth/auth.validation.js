import { z } from 'zod';
import { ROLES } from '../../utils/constants.js';

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum([ROLES.EMPLOYER, ROLES.JOB_SEEKER]).optional(),
  companyName: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});