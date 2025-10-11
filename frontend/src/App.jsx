import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Medicaments from "./pages/Medicaments";
import MedicamentDetail from "./pages/MedicamentDetail";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    // L'application doit être entourée d'un <Router>
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes protégées */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/medicaments"
          element={
            <PrivateRoute>
              <Medicaments />
            </PrivateRoute>
          }
        />
        <Route
          path="/medicaments/:id"
          element={
            <PrivateRoute>
              <MedicamentDetail />
            </PrivateRoute>
          }
        />

        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
