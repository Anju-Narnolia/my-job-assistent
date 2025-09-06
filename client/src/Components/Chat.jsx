import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Loader from "../loader/Loader";
import TextareaAutosize from "react-textarea-autosize";
import PropTypes from "prop-types";

// Add welcome message directly in state instead of mapping later
const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! How can I assist you right now?",
};

export default function Chat({ messages, onSend, loading = false }) {
  const [content, setContent] = useState("");
  const [chatMessages, setChatMessages] = useState([WELCOME_MESSAGE]); // 👈 changed here
  const bottomRef = useRef(null);

  // Sync parent messages into local chat
  useEffect(() => {
    setChatMessages([WELCOME_MESSAGE, ...messages]);
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [chatMessages]);

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.trim().length > 0) {
      onSend(content);
      setContent("");
    }
  }

  function handleEnterPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  }

  return (
    <div className="p-[2px] rounded-3xl m-1 lg:mx-20 dark:bg-gradient-to-bl from-[#05294a] via-[#0b312d] to-[#01111f] bg-gradient-to-bl ">
      <div
        className="flex flex-col overflow-y-auto p-4 justify-between bg-[#fefefe]
        dark:bg-gradient-to-b from-[#0a0f1a] to-[#000] rounded-3xl"
        style={{
          boxShadow: "-10px -10px 40px rgba(0, 132, 255, 0.25)",
        }}
      >
        <div className="flex flex-col overflow-y-auto gap-2 h-[65vh] md:h-[80vh] lg:h-[37rem]">
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="text-gray-500 dark:text-gray-400">
                Loading messages...
              </div>
            </div>
          )}
          {chatMessages.map(({ role, content, time }, index) => (
            <div
              key={index}
              data-role={role}
              className={`flex mb-2 ${
                role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {role === "assistant" && (
                <div className="w-10 h-10 mx-2 rounded-full bg-cyan-900 dark:bg-cyan-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
                  AI
                </div>
              )}

              <div>
                <div
                  className={`text-md p-2 backdrop-blur-md border border-white/10 shadow-lg ${
                    role === "assistant"
                      ? "dark:bg-white/10 bg-gray-300 text-gray-800 dark:text-white rounded-md mr-32"
                      : "dark:bg-white/5 bg-gray-200 text-gray-950 dark:text-gray-200 rounded-md ml-32"
                  }`}
                  style={{
                    boxShadow:
                      role === "user"
                        ? "0px 0px 20px rgba(0, 132, 255, 0.4)"
                        : "0px 0px 15px rgba(0,255,255,0.5)",
                  }}
                >
                  <ReactMarkdown>{String(content)}</ReactMarkdown>

                  {/*  timestamps */}
                  <div className="text-xs text-gray-400 mt-1">
                    {time
                      ? new Date(time).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "Asia/Kolkata", // 👈 forces IST (fixes Render/Vercel UTC issue)
                        })
                      : ""}
                  </div>
                </div>
              </div>

              {role === "user" && (
                <div className="w-10 h-10 mx-2 rounded-full dark:bg-blue-600 bg-blue-800 flex items-center justify-center text-white font-bold shadow-md">
                  U
                </div>
              )}
            </div>
          ))}

          {messages.length > 0 &&
            messages[messages.length - 1].role === "user" && (
              <div className="flex justify-start mb-2">
                <div className="w-10 h-10 mx-2 rounded-full bg-cyan-900 dark:bg-cyan-600 flex items-center justify-center text-white font-bold shadow-md">
                  AI
                </div>
                <div className="p-2 flex items-center gap-2 bg-white/10 text-white rounded-md border border-white/10 shadow-lg">
                  <Loader />
                </div>
              </div>
            )}

          {/* Invisible div for auto-scroll */}
          <div ref={bottomRef} />
        </div>

        {/* Input box */}
        <div className="flex shadow-[0px_0px_20px_rgba(0,132,255,0.4)] px-6 py-4 placeholder:text-gray-500 rounded-lg border border-cyan-200/50">
          <TextareaAutosize
            className="w-full h-full outline-none dark:text-white/80"
            placeholder="Enter your message here.."
            value={content}
            minRows={1}
            maxRows={4}
            onChange={handleContentChange}
            onKeyDown={handleEnterPress}
            aria-label="Chat message input"
          />

          <button
            className="dark:text-white/70 text-xl disabled:opacity-50"
            onClick={handleContentSend}
            disabled={!content.trim()}
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
Chat.propTypes = {
  messages: PropTypes.array,
  onSend: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
