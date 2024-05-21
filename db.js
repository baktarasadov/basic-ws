const mongoose = require("mongoose");

async function createDbConnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://course:pX7EjNNdMKSxMxav@cluster0.techwy8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
}

module.exports = createDbConnection;
