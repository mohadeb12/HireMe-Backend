import config from './config/env.js';
import connectDB from './config/db.js';
import app from './app.js';

const start = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();