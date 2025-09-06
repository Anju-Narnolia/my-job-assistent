import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "../prompt.js";

const googleai = new GoogleGenerativeAI(process.env.VITE_GOGGLE_AI_API_KEY);

export class Assistant {
  #model;
  #gemini;

  constructor(model = "gemini-1.5-flash") {
    this.#model = model;
    this.#gemini = googleai.getGenerativeModel({ model: this.#model });
  }

  async chat(userContent = []) {

    // Prepend system prompt for consistent behavior with OpenAI adapter
    const prompt = `${SYSTEM_PROMPT}\n\n${userContent}`;
    const result = await this.#gemini.generateContent(prompt);
    return result.response.text();
  }
}