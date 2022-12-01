import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
