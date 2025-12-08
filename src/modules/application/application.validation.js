import { z } from 'zod';
import { APPLICATION_STATUS } from '../../utils/constants.js';

export const updateStatusSchema = z.object({
  status: z.enum(Object.values(APPLICATION_STATUS))
});