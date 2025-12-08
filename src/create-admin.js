import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './modules/user/user.model.js';
import { ROLES } from './utils/constants.js';

const run = async () => {
  try {
    await connectDB();

    const password = 'admin123';
    const hashed = await bcrypt.hash(password, 10);

    const existing = await User.findOne({ email: 'admin@test.com' });
    if (existing) {
      console.log('Admin already exists:', existing.email);
    } else {
      const admin = await User.create({
        name: 'Super Admin',
        email: 'admin@test.com',
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