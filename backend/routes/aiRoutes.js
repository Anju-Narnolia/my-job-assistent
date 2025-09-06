// backend/routes/aiRoutes.js
import express from "express";
import { Assistant as GoogleAssistant } from "../assistant/googleai.js";
import { Assistant as OpenAIAssistant } from "../assistant/openai.js";
import { Assistant as DeepSeekAssistant } from "../assistant/deepseekai.js";
import { Assistant as ClaudeAssistant } from "../assistant/claudeai.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { provider, prompt } = req.body;

    let assistant;
    if (provider === "google") assistant = new GoogleAssistant();
    else if (provider === "openai") assistant = new OpenAIAssistant();
    else if (provider === "deepseek") assistant = new DeepSeekAssistant();
    else if (provider === "anthropic") assistant = new ClaudeAssistant();

    const reply = await assistant.chat(prompt);

    res.json({ success: true, reply });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
