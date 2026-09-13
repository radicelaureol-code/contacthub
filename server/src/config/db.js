const mongoose = require('mongoose');
const { mongoUri } = require('./env');

async function connectDB() {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connecté');
  } catch (err) {
    console.error('❌ Erreur de connexion MongoDB:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;