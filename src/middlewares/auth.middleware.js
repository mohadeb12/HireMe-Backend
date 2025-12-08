import { verifyToken } from '../utils/jwt.js';

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      return next(error);
    }
    const token = header.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = {
      id: decoded.userId,
      role: decoded.role
    };
    next();
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

export default auth;