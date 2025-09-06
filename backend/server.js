import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/useroute.js";
import router from "./routes/chatRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/user", userRouter);
app.use("/api/chat", router);
app.use("/api/ai", aiRouter);

// connect to database
await connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port node " + process.env.PORT);
});
