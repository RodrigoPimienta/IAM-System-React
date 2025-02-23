import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  const isAuthenticated = auth?.id_user != null;
  return isAuthenticated ? children : <Navigate to="/" />;
};
