import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    mongoose.connection.on("error", (error) => {
      console.log("Error connecting to MongoDB", error);
    });

    await mongoose.connect(`${process.env.Mongo_DB_URI}/AI_Chat_Bot`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
