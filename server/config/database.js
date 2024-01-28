const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://priyarama0023:septemberalien@nasacluster.qkacdny.mongodb.net/nasa_db?retryWrites=true&w=majority";

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
