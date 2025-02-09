import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "../../../hooks/useFetch";

export const useUsers = () => {
    const { requestGet, requestPost, requestPut, requestPatch } = useFetch();
    const queryClient = useQueryClient();

    const mapUsers = (user) => ({
        id: user.id,
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
            const response = await requestGet("http://localhost:8000/api/users");
            return response.data ? response.data.map(mapUsers) : [];
        },
    });

    // Mutaciones
    const postUser = useMutation({
        mutationFn: async (userData) => requestPost("http://localhost:8000/api/users", userData),
        onSuccess: () => queryClient.invalidateQueries(["users"]),
    });

    const editUser = useMutation({
        mutationFn: async ({ id, userData }) => requestPut(`http://localhost:8000/api/users/${id}`, userData),
        onSuccess: () => queryClient.invalidateQueries(["users"]),
    });

    const updateStatus = useMutation({
        mutationFn: async ({ id, status }) => requestPatch(`http://localhost:8000/api/users/${id}/status`, { status }),
        onSuccess: () => queryClient.invalidateQueries(["users"]),
    });

    return { resUsers, loading, error, postUser, editUser, updateStatus };
};
