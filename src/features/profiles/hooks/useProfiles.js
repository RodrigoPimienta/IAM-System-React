import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch"; // Importar el hook useFetch
import { getProfilesAPI, createProfileAPI, updateProfileAPI, deleteProfileAPI } from "../services/profiles"; // Importar los servicios

export const useProfiles = () => {

    const [profiles, setProfiles] = useState([]);
    const [errorProfiles, setErrorProfiles] = useState(null);
    const { requestGet, requestPost, requestPut, requestDelete, loading, error } = useFetch(); // Usar el hook useFetch

    const getProfiles = async () => {
        try {
            const newProfiles = await getProfilesAPI(requestGet);
            setProfiles(newProfiles);
        } catch (e) {
            setErrorProfiles(error || "Error al obtener perfiles");
        }
    };

    const createProfile = async (profileData) => {
        try {
            await createProfileAPI(requestPost, profileData);
            getProfiles(); // Refrescar la lista de perfiles después de la creación
        } catch (e) {
            setErrorProfiles(error || "Error al crear perfil");
        }
    };

    const updateProfile = async (profileId, profileData) => {
        try {
            await updateProfileAPI(requestPut, profileId, profileData);
            getProfiles(); // Refrescar la lista de perfiles después de la actualización
        } catch (e) {
            setErrorProfiles(error || "Error al actualizar perfil");
        }
    };

    const deleteProfile = async (profileId) => {
        try {
            await deleteProfileAPI(requestDelete, profileId);
            getProfiles(); // Refrescar la lista de perfiles después de eliminar
        } catch (e) {
            setErrorProfiles(error || "Error al eliminar perfil");
        }
    };

    return { profiles, loading, errorProfiles, getProfiles, createProfile, updateProfile, deleteProfile };
}
