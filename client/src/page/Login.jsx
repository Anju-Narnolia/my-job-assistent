import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseUrl = useSelector((state) => state.config.apiBaseUrl);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(login({ user: data.user, token: data.token }));

        // Small delay to ensure Redux state updates before navigation
        setTimeout(() => {
          navigate("/chat");
        }, 100);

        alert(data.message || "Login success");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  w-1/4 p-8 text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-4xl font-medium underline text-center py-3">
          <span className="text-indigo-500">Welcome</span> Back 👋
        </p>
        <p className="text-center text-neutral-700 py-3">Login to continue your chat and access your saved history.</p>
        <div className="w-full py-3">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-400 rounded w-full p-2 mt-1 outline-indigo-500 "
            type="email"
            required
          />
        </div>

        <div className="w-full py-3">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-400 rounded w-full p-2 mt-1 outline-indigo-500"
            type="password"
            required
          />
        </div>

        <p className="py-3 text-lg">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-500 cursor-pointer"
          >
            Register
          </span>
        </p>

        <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
}
