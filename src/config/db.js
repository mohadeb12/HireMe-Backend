import mongoose from 'mongoose';
import config from './env.js';

const connectDB = async () => {
  await mongoose.connect(config.mongoUri);
  console.log('MongoDB connected');
};

export default connectDB;