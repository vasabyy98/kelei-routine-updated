import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
// private route
import ProtectedRoute from "./components/ProtectedRoute";
// hooks
import { UserAuthContextProvider } from "./hooks/UserAuthContext";
// pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateExercise from "./pages/CreateExercise";
import CreateExerciseSet from "./pages/CreateExerciseSet";
import ChangeExercise from "./pages/ChangeExercise";
import ChangeExerciseSet from "./pages/ChangeExerciseSet";
import RepCounter from "./pages/RepCounter";
// redux
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <UserAuthContextProvider>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-exercise"
            element={
              <ProtectedRoute>
                <CreateExercise />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-exercise"
            element={
              <ProtectedRoute>
                <ChangeExercise />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-exerciseset"
            element={
              <ProtectedRoute>
                <CreateExerciseSet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-exerciseset"
            element={
              <ProtectedRoute>
                <ChangeExerciseSet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rep-counter"
            element={
              <ProtectedRoute>
                <RepCounter />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  </UserAuthContextProvider>
  // </React.StrictMode>
);
