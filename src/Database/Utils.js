import mongoose from "mongoose";

export const connectToMongo = async () => {
  await mongoose.connect(
    "mongodb+srv://1020dudu:du10du20@devclobdb.g5qwfzk.mongodb.net/?retryWrites=true&w=majority&appName=devClobDB"
  );
  console.log("Connected successfully to database");
};
