const mongoose = require('mongoose');
require('dotenv').config();

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    console.log('Using cached database connection');
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(process.env.CONNECTION_URL, {

    });

    cachedDb = db;
    console.log('Connected to database');
    return db;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Database connection failed');
  }
}

module.exports = { connectToDatabase };
