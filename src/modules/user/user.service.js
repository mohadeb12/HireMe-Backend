import bcrypt from 'bcryptjs';
import User from './user.model.js';
import { ROLES } from '../../utils/constants.js';

export const getAllUsers = async () => {
  const users = await User.find().select('-password');
  return users;
};

export const getUserById = async id => {
  const user = await User.findById(id).select('-password');
  return user;
};

export const createUser = async data => {
  const exists = await User.findOne({ email: data.email.toLowerCase() });
  if (exists) {
    const error = new Error('Email already in use');
    error.statusCode = 400;
    throw error;
  }
  const hashed = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    name: data.name,
    email: data.email.toLowerCase(),
    password: hashed,
    role: data.role || ROLES.JOB_SEEKER,
    companyName: data.companyName
  });
  const plain = user.toObject();
  delete plain.password;
  return plain;
};

export const updateUser = async (id, data) => {
  const update = { ...data };
  if (update.email) {
    update.email = update.email.toLowerCase();
  }
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }
  const user = await User.findByIdAndUpdate(id, update, {
    new: true
  }).select('-password');
  return user;
};

export const deleteUser = async id => {
  const user = await User.findByIdAndDelete(id).select('-password');
  return user;
};