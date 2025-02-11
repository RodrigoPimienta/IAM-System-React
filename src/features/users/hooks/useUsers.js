import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUsers, createUser, updateUser, updateUserStatus, updateUserPassword } from "../services/users";
import { useAuth } from "../../../hooks/useAuth";

export function useUsers({ enabled = true } = {}) {
    const { auth } = useAuth();
    const token = auth?.token;

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
    const { data: resUsers, isFetching: isFetchingUsers, error: errorUsers, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await getUsers(token);
            return response.data ? response.data.map(mapUsers) : [];
        },
        enabled,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    // Función para manejar estados globales en las mutaciones
    const handleMutationState = (loading, error = null) => {
        setIsLoading(loading);
        setError(error);
    };


    // Mutación para crear usuario
    const postUser = useMutation({
        mutationFn: async (userData) => createUser(token, userData),
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err)
    });

    // Mutación para editar usuario
    const editUser = useMutation({
        mutationFn: async ({ id_user, userData }) => updateUser(token, id_user, userData),
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err),
    });

    // Mutación para actualizar estado del usuario
    const updateStatus = useMutation({
        mutationFn: async ({ id_user, status }) => updateUserStatus(token, id_user, status),
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            handleMutationState(false);
            refetch();
        },
        onError: (err) => handleMutationState(false, err),
    });

    // Mutación para actualizar contraseña del usuario
    const updatePassword = useMutation({
        mutationFn: async ({ id, password }) => updateUserPassword(token, id, password),
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err),
    });

    let loading = isLoading || isFetchingUsers;
    let newError = error || errorUsers;

    return {
        resUsers, isLoading: loading, error:newError,
        postUser, editUser, updateStatus, updatePassword, handleMutationState
    };
};
