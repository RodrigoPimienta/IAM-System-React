import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, createUser, updateUser, updateUserStatus, updateUserPassword } from "../services/users";
import { useAuth } from "../../../hooks/useAuth";

export const useUsers = () => {
    const { auth } = useAuth();
    const token = auth?.token;

    const queryClient = useQueryClient();

    // Estado global para manejo de carga y errores
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const mapUsers = (user) => ({
        id_user: user.id,
        name: user.name,
        email: user.email,
        id_profile: user.profile[0]?.id_profile,
        profile: user.profile[0]?.profile,
        status: user.status,
    });

    // Obtener usuarios
    const { data: resUsers, isLoading: isLoadingUsers, error: errorUsers } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await getUsers(token);
            return response.data ? response.data.map(mapUsers) : [];
        },
    });

    // Función para manejar estados globales en las mutaciones
    const handleMutationState = (loading, error = null) => {
        setIsLoading(loading);
        console.log('typeof error mutation', typeof error)
        console.log('error mutation', error)
        setError(error);
    };

    // Mutación para crear usuario
    const postUser = useMutation({
        mutationFn: async (userData) => createUser(token, userData),
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err)
    });

    // Mutación para editar usuario
    const editUser = useMutation({
        mutationFn: async ({ id, userData }) => updateUser(token, id, userData),
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err),
    });

    // Mutación para actualizar estado del usuario
    const updateStatus = useMutation({
        mutationFn: async ({ id, status }) => updateUserStatus(token, id, status),
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err),
    });

    // Mutación para actualizar contraseña del usuario
    const updatePassword = useMutation({
        mutationFn: async ({ id, password }) => updateUserPassword(token, id, password),
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err),
    });

    return {
        resUsers, isLoadingUsers, errorUsers,
        postUser, editUser, updateStatus, updatePassword,
        isLoading, error
    };
};
