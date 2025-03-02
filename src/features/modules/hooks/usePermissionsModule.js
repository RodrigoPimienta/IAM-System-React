import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPermissionsModule, createPermissionModule, updatePermissionModule, updatePermissionModuleStatus } from "../services/modulesRols";
import { useAuth } from "../../../hooks/useAuth";

export function usePermissionsModule({ enabled = true, id_module } = {}) {
    const { auth } = useAuth();
    const token = auth?.token;

    // Estado global para manejo de carga y errores
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const mapPermissionsModule = (permission) => ({
        id_permission: permission.id_permission,
        id_module: permission.id_module,
        name: permission.name,
        key: permission.key,
        status: permission.status,
    });

    // Obtener usuarios
    const { data: resPermissions, isFetching: isFetchingPermissionsModule, error: errorPermissionsModule, refetch } = useQuery({
        queryKey: [`permissionModules_${id_module}`],
        queryFn: async () => {
            const response = await getPermissionsModule(token,id_module);
            return response.data ? response.data.map(mapPermissionsModule) : [];
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
        mutationFn: async (moduleData) => {
            moduleData.id_module = id_module;
            createPermissionModule(token, moduleData);
        },
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err)
    });

    // Mutación para editar usuario
    const edit = useMutation({
        mutationFn: async ({ id_permission, formData }) => {
            formData.id_module = id_module;
            updatePermissionModule(token, id_permission, formData)
        },
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err),
    });

    // Mutación para actualizar estado del usuario
    const updateStatus = useMutation({
        mutationFn: async ({ id_permission, status }) => updatePermissionModuleStatus(token, id_permission, status),
        onMutate: () => handleMutationState(true),
        onSuccess: () => {
            handleMutationState(false);
        },
        onError: (err) => handleMutationState(false, err),
    });


    let loading = isLoading || isFetchingPermissionsModule;
    let newError = error || errorPermissionsModule;

    return {
        resPermissions, isLoading: loading, error:newError,refetch,
        post, edit, updateStatus, handleMutationState
    };
};
