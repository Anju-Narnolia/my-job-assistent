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
    <div className="flex justify-center items-center flex-col">
      

      <div className=" flex justify-between flex-col bg-gray-100 rounded-lg p-4 w-1/2 h-[42rem] m-5">
        <div className="flex flex-col">
          <div>
            {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
              <div key={index} data-role={role}>
                <p
                  className={`text-md font-bold p-2 ${
                    role == "assistant" ? "bg-gray-100" : "bg-indigo-100"
                  }`}
                >
                  {" "}
                  {content}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex ">
          <input
            className="w-full h-full bg-white p-2 border-gray-200 border"
            placeholder="Enter your message here.."
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleEnterPress}
          ></input>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md ml-2"
            onClick={handleContentSend}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}
