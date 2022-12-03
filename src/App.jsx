import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateExercise from "./pages/CreateExercise";
import CreateExerciseSet from "./pages/CreateExerciseSet";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-exercise" element={<CreateExercise />} />
        <Route path="/create-exerciseset" element={<CreateExerciseSet />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
