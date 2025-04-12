import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("DB is connected");
  } catch (error: any) {
    console.error("DB connection error:", error.message);
  }
};

export default connectDB;
