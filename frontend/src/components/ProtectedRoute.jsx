import React from "react";
import { Navigate } from "react-router-dom";

// Simple auth check based on token
const ProtectedRoute = ({ children }) => {
  // Get the token from local storage
  const token = localStorage.getItem("token");

  // If no token is found, redirect to the login page
  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // If a token exists, render the children components (the protected content)
  return children;
};

export default ProtectedRoute;