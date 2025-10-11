import React from 'react';
import { Navigate } from 'react-router-dom';

// Composant pour protéger les routes privées
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // Si pas de token, rediriger vers login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Sinon, afficher le composant demandé
  return children;
};

export default PrivateRoute;