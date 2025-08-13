import { useState } from "react";
const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! How can I assist you right now?",
};
export default function Chat({ messages, onSend }) {
  const [content, setContent] = useState("");

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.length > 0) {
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
    <div div className="flex items-center justify-center">
      <div className="p-[2px] rounded-3xl  w-2/3  bg-gradient-to-bl from-[#05294a] via-[#0b312d] to-[#01111f]">
        <div
          className="flex flex-col h-[42rem] overflow-y-auto p-4 
      bg-gradient-to-b from-[#0a0f1a] to-[#000] rounded-3xl"
          style={{
            boxShadow: "-10px -10px 40px rgba(0, 132, 255, 0.25)",
          }}
        >
          <div className="flex flex-col h-[38rem] overflow-y-auto gap-5">
            {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
              <div
                key={index}
                data-role={role}
                className={`flex mb-2 ${
                  role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div>
                  
                  <p
                    className={`text-md p-2 backdrop-blur-md border border-white/10 shadow-lg ${
                      role === "assistant"
                        ? "bg-white/10 text-white rounded-md mr-32"
                        : "bg-white/5 text-gray-200 rounded-md ml-32"
                    }`}
                    style={{
                      boxShadow:
                        role === "user"
                          ? "0px 0px 20px rgba(0, 132, 255, 0.4)"
                          : "0px 0px 15px rgba(0,255,255,0.5)",
                    }}
                  >
                    {" "}
                    {content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex shadow-[0px_0px_20px_rgba(0,132,255,0.4)] px-6 py-4 placeholder:text-gray-500 rounded-lg">
            <input
              className="w-full h-full outline-none text-white/80"
              placeholder="Enter your message here.."
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleEnterPress}
            ></input>
            <button
              className=" text-white/70  text-xl "
              onClick={handleContentSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
