import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "../prompt.js";
const anthropic = new Anthropic({
  apiKey: process.env.VITE_CLAUDE_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant {
  #client;
  #model;

  constructor(model = "claude-3-5-haiku-latest" + 1, client = anthropic) {
    this.#client = client;
    this.#model = model;
  }

  async chat(content, history=[]) {
    try {
      const result = await this.#client.messages.create({
        model: this.#model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history,
          { content, role: "user" },
        ],
        max_tokens: 1024,
      });

      return result.content[0].text;
    } catch (error) {
      throw this.#parseError(error);
    }
  }

  async *chatStream(content, history=[]) {
    try {
      const result = await this.#client.messages.create({
        model: this.#model,
        messages: [...history, { content, role: "user" }],
        max_tokens: 1024,
        stream: true,
      });

      for await (const chunk of result) {
        if (chunk.type === "content_block_delta") {
          yield chunk.delta.text || "";
        }
      }
    } catch (error) {
      throw this.#parseError(error);
    }
  }

  #parseError(err) {
    if (!err) return "Unknown error";
  
    // If it's a normal Error object
    if (err instanceof Error) {
      return err.message;
    }
  
    // If it's an Anthropic-style error response
    if (err.error) {
      return err.error.message || err.error.error || JSON.stringify(err.error);
    }
  
    // Fallback: dump the object
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  }
  
}
