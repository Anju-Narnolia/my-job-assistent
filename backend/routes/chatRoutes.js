import express from "express";
import { saveMessage,getChatByDate,getChatDates } from "../controllers/chatController.js";

const router = express.Router();

// save a message
router.post("/save", saveMessage);

// get all chat dates for a user
router.get("/dates/:userId", getChatDates);

// get all messages by date
router.get("/:userId/:date", getChatByDate);

export default router;
