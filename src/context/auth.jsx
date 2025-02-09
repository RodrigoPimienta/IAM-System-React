import { createContext, useState, useEffect } from "react";
import { loginUser, logoutUser } from "../services/auth";  // Importar los servicios

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función para manejar el inicio de sesión
    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await loginUser(email, password);
            if (response.data) {
                setAuth({
                    id_user: response.data.id,
                    username: response.data.name,
                    email: response.data.email,
                    status: response.data.status,
                    token: response.data.token
                });
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para manejar el cierre de sesión
    const logout = async () => {
        setIsLoading(true);
        try {
            await logoutUser();
            setAuth(null);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
}
