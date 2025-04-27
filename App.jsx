import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./Dashboard";
import UploadDataset from "./components/UploadDataset";
import AIInsights from "./components/AIInsights";
import AIInsights2 from "./components/AIInsights2";
import AdminPanel from "./components/AdminPanel";
import SignUp from "./components/SignUp"; 
import LogIn from "./components/LogIn";
import { io } from "socket.io-client";

export default function App() {
  // Initialize Socket.IO client
  const socket = io('http://localhost:3000'); // Ensure this matches your backend server

  // Test connection by listening for the 'test_message'
  useEffect(() => {
    socket.on('test_message', (message) => {
      console.log(message);  // Should log 'Connection established' if the backend is connected
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.off('test_message');
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/login" element={<LogIn />} />
        <Route path="/upload" element={<UploadDataset />} />
        <Route path="/insights" element={<AIInsights />} />
        <Route path="/ai-insights2" element={<AIInsights2 />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}






