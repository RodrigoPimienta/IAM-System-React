import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { getPermissions } from "../services/auth";

export const PermissionsContext = createContext(null);

const mapPermissions = (permission) => {
    return permission?.access || {};
};

export function PermissionsProvider({ children }) {
    const { auth } = useAuth();
    const token = auth?.token;

    const { data, isFetching, isError, error, refetch } = useQuery({
        queryKey: ["permissions"],
        queryFn: async () => {
            const response = await getPermissions(token);
            return response.data ? mapPermissions(response.data) : {};
        },
        enabled: !!token,
        retry: 3,
        refetchOnWindowFocus: false,
    });

    const permissions = isError && error?.status !== 429 ? {} : data || {};

    return (
        <PermissionsContext.Provider
            value={{
                permissions,
                isFetching,
                error,
                isError,
                refetch,
            }}
        >
            {children}
        </PermissionsContext.Provider>
    );
}
