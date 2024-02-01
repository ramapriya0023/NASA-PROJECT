const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

// Connect to MongoDB
async function connectToDatabase() {
  console.log("calling");
  try {
    await mongoose.connect(MONGO_URL);
    //await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  connectToDatabase,
  mongoDisconnect,
};
