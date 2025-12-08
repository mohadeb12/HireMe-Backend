import * as authService from './auth.service.js';

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      data: result.user,
      token: result.token
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json({
      success: true,
      data: result.user,
      token: result.token
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};