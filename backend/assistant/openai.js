import OpenAI from "openai";
import { SYSTEM_PROMPT } from "../prompt.js";

const openai = new OpenAI({
  apiKey: process.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant {
  #client;
  #model; //make it private

  constructor(model = "gpt-4o-mini", client = openai) {
    this.#client = client;
    this.#model = model;
  }

  async chat(userContent, history = []) {
    try {
      const result = await this.#client.chat.completions.create({
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

  async *chatStream(content, history) {
    const result = await this.#client.chat.completions.create({
      model: this.#model,
      messages: [...history, { content, role: "user" }],
      stream: true,
    });

    for await (const chunk of result) {
      yield chunk.choices[0]?.delta?.content || "";
    }
  }
}
