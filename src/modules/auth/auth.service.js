import bcrypt from 'bcryptjs';
import User from '../user/user.model.js';
import { signToken } from '../../utils/jwt.js';
import { ROLES } from '../../utils/constants.js';

export const register = async data => {
  const existing = await User.findOne({ email: data.email.toLowerCase() });
  if (existing) {
    const error = new Error('Email already in use');
    error.statusCode = 400;
    throw error;
  }
  let role = data.role || ROLES.JOB_SEEKER;
  if (role === ROLES.ADMIN) {
    role = ROLES.JOB_SEEKER;
  }
  const hashed = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    name: data.name,
    email: data.email.toLowerCase(),
    password: hashed,
    role,
    companyName: data.companyName
  });
  const plain = user.toObject();
  delete plain.password;
  const token = signToken({ userId: user._id, role: user.role });
  return { user: plain, token };
};

export const login = async data => {
  const user = await User.findOne({ email: data.email.toLowerCase() });
  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = 400;
    throw error;
  }
  const match = await bcrypt.compare(data.password, user.password);
  if (!match) {
    const error = new Error('Invalid credentials');
    error.statusCode = 400;
    throw error;
  }
  const plain = user.toObject();
  delete plain.password;
  const token = signToken({ userId: user._id, role: user.role });
  return { user: plain, token };
};

export const getProfile = async userId => {
  const user = await User.findById(userId).select('-password');
  return user;
};