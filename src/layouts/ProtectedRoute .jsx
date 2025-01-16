import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  const isAuthenticated = auth.isLoggedIn;
  return isAuthenticated ? children : <Navigate to="/" />;
};
