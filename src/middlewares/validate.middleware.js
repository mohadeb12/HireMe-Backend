import { ZodError } from 'zod';

const validate = schema => {
  return async (req, res, next) => {
    try {
      const result = await schema.parseAsync(req.body);
      req.body = result;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.issues.map(e => e.message).join(', ');
        const error = new Error(message);
        error.statusCode = 400;
        return next(error);
      }
      next(err);
    }
  };
};

export default validate;