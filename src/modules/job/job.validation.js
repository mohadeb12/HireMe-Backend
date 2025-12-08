import { z } from 'zod';

export const createJobSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  salaryRange: z.string().optional()
});

export const updateJobSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  salaryRange: z.string().optional()
});