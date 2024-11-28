const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || require('../config/default.json').MONGO_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };
