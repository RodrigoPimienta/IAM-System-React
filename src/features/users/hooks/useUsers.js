import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, createUser, updateUser, updateUserStatus } from "../services/users";  // Importar los servicios
import { useAuth } from "../../../hooks/useAuth"; // Aquí sí puedes usar el hook

export const useUsers = () => {
     const { auth } = useAuth(); // Aquí sí puedes usar el hook
    const token = auth?.token; // Obtener el token de autenticación
    
    const queryClient = useQueryClient();

    const mapUsers = (user) => ({
        id_user: user.id,
        name: user.name,
        email: user.email,
        id_profile: user.profile[0].id_profile,
        profile: user.profile[0].profile,
        status: user.status,
    });

    // Obtener usuarios (React Query maneja loading/error automáticamente)
    const { data: resUsers, isLoading: loading, error } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await getUsers(token);
            return response.data ? response.data.map(mapUsers) : [];
        },
    });

    // Mutaciones
    const postUser = useMutation({
        mutationFn: async (userData) => createUser(token,userData),
        onSuccess: () => queryClient.invalidateQueries(["users"]),
    });

    const editUser = useMutation({
        mutationFn: async ({ id, userData }) => updateUser(token,id, userData),
        onSuccess: () => queryClient.invalidateQueries(["users"]),
    });

    const updateStatus = useMutation({
        mutationFn: async ({id, status }) => updateUserStatus(token, id, status),
        onSuccess: () => queryClient.invalidateQueries(["users"]),
    });

    const updatePassword = useMutation({
        mutationFn: async ({id, password }) => updateUserPassword(token,id, password),
        onSuccess: () => queryClient.invalidateQueries(["users"]),
    });

    return { resUsers, loading, error, postUser, editUser, updateStatus, updatePassword };
};
