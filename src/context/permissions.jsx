import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth"; // Aquí sí puedes usar el hook
import { getPermissions} from "../services/auth";  // Importar los servicios

export const PermissionsContext = createContext(null);

const mapPermissions = (permission) => {
    return permission?.access || {};
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
