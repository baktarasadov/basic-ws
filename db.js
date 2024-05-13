const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

async function createDbConnection() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
}

module.exports = createDbConnection;
