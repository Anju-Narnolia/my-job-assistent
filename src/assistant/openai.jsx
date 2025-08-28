import OpenAI from "openai";
import { SYSTEM_PROMPT } from "../prompt.js";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant {
  #model; //make it private

  constructor(model = "gpt-4o-mini") {
    this.#model = model;
  }

  async chat(userContent, history = []) {
    try {
      const result = await openai.chat.completions.create({
        model: this.#model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history,
          { role: "user", content: userContent },
        ],
      });
      return result.choices[0].message.content;
    } catch (error) {
      if (error.status === 429) {
        throw new Error(
          "Rate limited by OpenAI. Please wait a moment and try again."
        );
      }
      throw error;
    }
  }
}
