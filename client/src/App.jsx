import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import DemoPage from "./page/Demo.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";

export default function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/chat" /> : <Login />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/chat" /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/chat" /> : <Register />}
      />
      <Route
        path="/chat"
        element={user ? <DemoPage /> : <Navigate to="/login" />}
      />
      <Route path="/chat/:chatId" element={<DemoPage />} />{" "}
      {/* same component */}
    </Routes>
  );
}
