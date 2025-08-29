import { Assistant as OpenAIAssistant } from "../assistant/openai";
import { Assistant as GoogleAssistant } from "../assistant/googleai";
import { Assistant as DeepSeekAssistant } from "../assistant/deepseekai";
import { Assistant as ClaudeAssistant } from "../assistant/claudeai";
import { useState, useEffect } from "react";
import Chat from "../Components/Chat";

export default function Dashboard() {
  const [provider, setProvider] = useState("google"); // 'openai' | 'google'
  const assistant =
    provider === "google"
      ? new GoogleAssistant()
      : provider == "openai"
      ? new OpenAIAssistant()
      : provider == "deepseek"
      ? new DeepSeekAssistant()
      : provider == "anthropic"
      ? new ClaudeAssistant()
      : "";

  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    try {
      const result = await assistant.chat(content);
      addMessage({ content: result, role: "assistant" });
    } catch (error) {
      console.log(error);
      addMessage({
        content:
          error?.message ===
          "Rate limited by OpenAI. Please wait a moment and try again."
            ? error.message
            : "Sorry, I couldn't process your request. Please try again!",
        role: "assistant",
      });
    }
  }
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setDark(!dark);
  };
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex justify-between p-2 gap-3">
          <div className="flex gap-2">
            <label className="dark:text-white/70 text-xl">Provider</label>
            <select
              className="dark:bg-white/10 border-gray-200 rounded-md dark:text-white/80 border dark:border-white/10 "
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            >
              <option value="deepseek"> Deepseek AI</option>
              <option value="google">Google (Gemini)</option>
              <option value="openai">OpenAI</option>
              <option value="anthropic"> claudeI</option>
            </select>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md shadow-md bg-gray-200 dark:bg-gray-700 transition"
          >
            {dark ? " Dark 🌙 " : " Light ☀️"}
          </button>
        </div>
        <Chat messages={messages} onSend={handleContentSend} />
      </div>
    </div>
  );
}
