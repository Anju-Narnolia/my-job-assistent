import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "assistant"], 
    required: true,
  },
  time: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  date: { type: String, required: true }, // e.g. "2025-09-05"
  messages: [messageSchema],
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
