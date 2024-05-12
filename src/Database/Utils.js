import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToMongo = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected successfully to database");
};
