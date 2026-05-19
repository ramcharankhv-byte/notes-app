import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
