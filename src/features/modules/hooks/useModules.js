import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getModules, createModule, updateModule, updateModuleStatus } from "../services/modules";
import { useAuth } from "../../../hooks/useAuth";

export function useModules({ enabled = true } = {}) {
    const { auth } = useAuth();
    const token = auth?.token;

    // Estado global para manejo de carga y errores
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const mapModules = (module) => ({
        id_module: module.id_module,
        name: module.name,
        key: module.key,
        status: module.status,
    });

    // Obtener usuarios
    const { data: resModules, isFetching: isFetchingModules, error: errorModules, refetch } = useQuery({
        queryKey: ["modules"],
        queryFn: async () => {
            const response = await getModules(token);
            return response.data ? response.data.map(mapModules) : [];
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
    const post = useMutation({
        mutationFn: async (moduleData) => createModule(token, moduleData),
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err)
    });

    // Mutación para editar usuario
    const edit = useMutation({
        mutationFn: async ({ id_module, formData }) => updateModule(token, id_module, formData),
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err),
    });

    // Mutación para actualizar estado del usuario
    const updateStatus = useMutation({
        mutationFn: async ({ id_module, status }) => updateModuleStatus(token, id_module, status),
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err),
    });


    let loading = isLoading || isFetchingModules;
    let newError = error || errorModules;

    return {
        resModules, isLoading: loading, error:newError,refetch,
        post, edit, updateStatus, handleMutationState
    };
};
