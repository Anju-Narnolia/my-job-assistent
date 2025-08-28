import Chat from "./Components/Chat";
import { Assistant as OpenAIAssistant } from "./assistant/openai";
import { Assistant as GoogleAssistant } from "./assistant/googleai";
import { useState, useEffect } from "react";

function App() {
  const [provider, setProvider] = useState("google"); // 'openai' | 'google'
  const assistant =
    provider === "google" ? new GoogleAssistant() : new OpenAIAssistant();
  const [messages, setMessages] = useState([]);

  // Start chat lazily on first send to avoid duplicate mount-time calls

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
    <div className="dark:bg-black min-h-screen bg-gray-50">
      <p className="text-3xl p-3 bg-gradient-to-bl text-center from-[#54757c] to-[#72b3f0] bg-clip-text text-transparent font-semibold">
        My Job Assistant
      </p>
      <div className="flex justify-center p-2 gap-3">
        <div className="flex items-center gap-3">
          <label className="dark:text-white/70 text-xl">Provider</label>
          <select
            className="dark:bg-white/10 bg-gray-300 dark:text-white/80 border border-white/10 rounded  p-2"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value="google">Google (Gemini)</option>
            <option value="openai">OpenAI</option>
          </select>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md shadow-md bg-gray-200 dark:bg-gray-700 transition"
        >
          {dark ? " Dark 🌙 " : " Light ☀️"}
        </button>
      </div>
      <div className="p-5">
        <Chat messages={messages} onSend={handleContentSend} />
      </div>{" "}
    </div>
  );
}

export default App;
