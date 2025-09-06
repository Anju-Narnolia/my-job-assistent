import React, { useState, useEffect, useRef } from "react";
import Chat from "./Chat";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function Dashboard({
  messages: propMessages,
  userId: propUserId,
  loading,
}) {
  const [provider, setProvider] = useState("google");
  const [messages, setMessages] = useState([]);
  const [dark, setDark] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const baseUrl = useSelector((state) => state.config.apiBaseUrl);
  const userId = propUserId || user?._id;
  const chatContainerRef = useRef(null);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  // Sync prop messages with local state
  useEffect(() => {
    if (propMessages) {
      setMessages(propMessages);
    }
  }, [propMessages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function saveMessage(userId, message) {
    try {
      const res = await fetch(`${baseUrl}/api/chat/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          content: message.content,
          role: message.role || "user",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save message");
      }
      console.log("Message saved:", data);
    } catch (error) {
      console.error("Failed to save message:", error);
    }
  }

  // Send content to backend AI
  async function handleContentSend(content) {
    // Save + show user message
    const userMessage = { content, role: "user" };
    addMessage(userMessage);

    await saveMessage(userId, userMessage);

    try {
      const res = await fetch(`${baseUrl}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, prompt: content }),
      });

      const data = await res.json();

      const assistantMessage = { content: data.reply, role: "assistant" };
      addMessage(assistantMessage);
      await saveMessage(userId, assistantMessage);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        content: "⚠️ Sorry, I couldn't process your request. Please try again!",
        role: "assistant",
      };
      addMessage(errorMessage);
      await saveMessage(userId, errorMessage);
    }
  }

  //dark mode setup
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);
  //
  const handelLogout = async () => {
    dispatch(logout());
    navigate("/login");
    console.log("logout successfully");
  };

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
          <div className="flex gap-2 items-center">
            <label className="dark:text-white/70 lg:text-xl">Provider</label>
            <select
              className="dark:bg-white/10 border-gray-200 rounded-md dark:text-white/80 border dark:border-white/10 text-sm lg:text-xl py-2 "
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            >
              <option value="deepseek"> Deepseek AI</option>
              <option value="google">Google (Gemini)</option>
              <option value="openai">OpenAI</option>
              <option value="anthropic"> claudeI</option>
            </select>
          </div>
          <div className=" flex gap-2">
            <button
              onClick={toggleTheme}
              className="px-2 rounded-md shadow-md bg-gray-200 dark:bg-gray-700 transition text-sm lg:text-xl"
            >
              {dark ? " Dark" : " Light"}
            </button>
            <button
              onClick={handelLogout}
              className="px-2 rounded-md shadow-md hover:bg-gray-200 transition bg-red-300 text-sm lg:text-xl "
            >
              Logout
            </button>
          </div>
        </div>
        <Chat
          messages={messages}
          onSend={handleContentSend}
          loading={loading}
        />
      </div>
    </div>
  );
}
Dashboard.propTypes = {
  messages: PropTypes.array,
  userId: PropTypes.string,
  loading: PropTypes.bool,
};
