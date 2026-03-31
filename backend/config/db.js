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

    // For MongoDB Atlas (mongodb+srv), don't append database name path
    // For local MongoDB, append the database name
    const mongoUrl = process.env.Mongo_DB_URI.includes("mongodb+srv")
      ? process.env.Mongo_DB_URI
      : `${process.env.Mongo_DB_URI}/AI_Chat_Bot`;

    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
