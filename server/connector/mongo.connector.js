const mongoose = require("mongoose");

const connectMongoDB = async () => {
  const localURI = "mongodb://localhost:27017/project_management"; // ✅ Correct Mongo port
  const onlineURI = process.env.MONGODB_ONLINE_URI; // Set this in .env if using cloud DB

  const mongoURI = onlineURI || localURI;

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ Connected to MongoDB: ${mongoURI}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
