import { z } from 'zod';
import { ROLES } from '../../utils/constants.js';

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(Object.values(ROLES)),
  companyName: z.string().optional()
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(Object.values(ROLES)).optional(),
  companyName: z.string().optional()
});