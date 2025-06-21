import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Sensores from "./pages/Sensores";
import AddSensor from "./pages/AddSensor";
import EditSensor from "./pages/EditSensor";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sensors" element={<Sensores />} />
      <Route path="/add" element={<AddSensor />} />
      <Route path="/edit/:id" element={<EditSensor />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}