import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import User from '../modules/user/user.model.js';
import { ROLES } from './constants.js';

const run = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const hashed = await bcrypt.hash(password, 10);

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin already exists:', existing.email);
    } else {
      const admin = await User.create({
        name: 'Super Admin',
        email,
        password: hashed,
        role: ROLES.ADMIN
      });
      console.log('Admin created:', admin.email);
      console.log('Password:', password);
    }
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
};

run();