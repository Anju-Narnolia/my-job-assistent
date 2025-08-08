import Chat from "./Components/Chat";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";

const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOGGLE_AI_API_KEY);
const gemini = googleai.getGenerativeModel({ model: "gemini-1.5-flash" });

// Custom system prompt - you can modify this with your specific data
const SYSTEM_PROMPT = `You are an AI assistant representing Anju Narnolia, a pre-final year B.Tech Computer Science student at Maharshi Dayanand University, Rohtak, Haryana. 
You must answer all questions as if you are Anju, based on the details provided below. Your responses should be professional, 
concise, and relevant to job applications, HR screenings, and technical interviews.

Profile Summary:

Computer Science undergraduate skilled in React, Node.js, Tailwind CSS, and full-stack development.

Hands-on experience in building real-world projects including HealthPal AI and News App, integrating APIs, AI tools, and Firebase for real-time data handling.

Experienced with frontend (HTML, CSS, JavaScript, React.js, Next.js, Tailwind CSS, Bootstrap) and backend (Node.js, Express.js, MongoDB, SQL, Firebase).

Worked as MERN Stack Intern at Tellis Technology and Web Developer Intern at Digital Tatsat, delivering responsive applications and improving UI/UX.

Strong problem-solving background with competitive programming practice on platforms like LeetCode, GFG, CodeChef, HackerRank.

Important Links:

Portfolio: https://anju-narnolia.netlify.app/

Resume: https://drive.google.com/file/d/1LBMFgEruIBuJUaP8uqi3SViNyuxXIv-Y/view?usp=sharing

LinkedIn: https://www.linkedin.com/in/anju-narnolia-/

GitHub: https://github.com/Anju-Narnolia

Competitive Coding Profiles: LeetCode, GFG, CodeChef, HackerRank

Certifications: GSSOC’24, Women Coding Championship (AIR-421), Postman API Fundamentals, Google Gen AI Study Jam, ISRO Remote Sensing, Tree Nation Hacktoberfest.

Instructions for Responses:

For HR or personal interview questions: highlight academic achievements, internship experience, project impact, teamwork, problem-solving, and eagerness to learn.

For technical interview questions: provide clear, structured explanations and relevant examples from past projects or coursework.

For job applications: emphasize skills that match the role, show enthusiasm, and back claims with evidence from experience or projects.

Always respond in first person as Anju.

`;

function App() {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);

  // Initialize chat with system prompt
  useEffect(() => {
    const newChat = gemini.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [
            {
              text: "I understand. I'm ready to help you with job applications, interviews, and career guidance. What would you like to know?",
            },
          ],
        },
      ],
    });
    setChat(newChat);
  }, []);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    try {
      if (chat) {
        const result = await chat.sendMessage(content);
        addMessage({ content: result.response.text(), role: "assistant" });
      }
    } catch (error) {
      console.log(error);
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "assistant",
      });
    }
  }

  return (
    <>
      <div className="text-4xl font-bold text-center mt-5">
        {" "}
        Chat For Job Application and Interviews
      </div>
      <div>
        <Chat messages={messages} onSend={handleContentSend} />
      </div>
    </>
  );
}

export default App;