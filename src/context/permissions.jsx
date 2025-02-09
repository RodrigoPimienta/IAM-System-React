import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../services/fetcher";
import { useAuth } from "../hooks/useAuth"; // Aquí sí puedes usar el hook

export const PermissionsContext = createContext(null);

const mapPermissions = (permission) => {
    return permission?.access || {};
};

const getPermissions = async (token) => {
    return await fetcher("http://localhost:8000/api/auth/permissions", token);
};

export function PermissionsProvider({ children }) {
    const { auth } = useAuth(); // Aquí sí puedes usar el hook
    const token = auth?.token; // Obtener el token de autenticación

    const { data: permissions, isLoading, error, refetch } = useQuery({
        queryKey: ["permissions"],
        queryFn: async () => {
            const response = await getPermissions(token);
            return response.data ? mapPermissions(response.data) : {};
        },
        enabled: !!token, // Solo ejecuta la query si hay un token
        retry: 3,
        refetchOnWindowFocus: false,
    });

    return (
        <PermissionsContext.Provider 
            value={{
                permissions,
                isLoading,
                error,
                updatePermissions: refetch,
            }}
        >
            {children}
        </PermissionsContext.Provider>
    );
}
