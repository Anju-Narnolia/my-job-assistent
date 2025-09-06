import OpenAI from "openai";
import { Assistant as OpenAIAssistant } from "./openai.js";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.VITE_DEEPSEEK_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant extends OpenAIAssistant {
  constructor(model = "deepseek-chat", client = openai) {
    super(model, client);
  }
}