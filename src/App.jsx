// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Anmelden from "./anmelden";
import Chat from "./Chat";
import ProtectedRoute from "./ProtectedRoute";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/anmelden" element={<Anmelden/>} />
        <Route 
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

