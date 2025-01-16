import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // Cambia esto según tu lógica de autenticación

  return isAuthenticated ? children : <Navigate to="/" />;
};
