import { useState } from "react"
import {getProfilesAPI} from '../services/profiles'

export const useProfiles = () => {

    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorProfiles, setErrorProfiles] = useState(null)

    const getProfiles = async () => {
        setLoading(true)
        setErrorProfiles(null)
        try {
            const newProfiles = await getProfilesAPI()
            setProfiles(newProfiles)
        } catch (error) {
            setErrorProfiles(error)
        } finally {
            setLoading(false)
        }
    };

    const activateProfile = async (id) => {
        console.log(`Activating profile with ID ${id}`);
        // Aquí podrías llamar a una API para activar al perfil
        const updatedProfiles = profiles.map((profile) =>
            profile.id === id ? { ...profile, status: 1 } : profile
        );
        setProfiles(updatedProfiles);
    };

    const deactivateProfile = async (id) => {
        console.log(`Deactivating profile with ID ${id}`);
        const updatedProfiles = profiles.map((profile) =>
            profile.id === id ? { ...profile, status: 2 } : profile
        );
        setProfiles(updatedProfiles);
    };

    const editProfile = (id) => {
        console.log(`Editing profile with ID ${id}`);
        // Lógica para abrir un modal o redirigir a una pantalla de edición
    };

    return { profiles, loading, errorProfiles, getProfiles, activateProfile, deactivateProfile, editProfile }
}
