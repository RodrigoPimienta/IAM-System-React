import { useState } from "react"
import {getModulesAPI} from '../services/modules'

export const useModules = () => {

    const [modules, setModules] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorModules, setErrorModules] = useState(null)

    const getModules = async () => {
        setLoading(true)
        setErrorModules(null)
        try {
            const newProfiles = await getModulesAPI()
            setModules(newProfiles)
        } catch (error) {
            setErrorModules(error)
        } finally {
            setLoading(false)
        }
    };

    const activateModule = async (id) => {
        console.log(`Activating profile with ID ${id}`);
        // Aquí podrías llamar a una API para activar al perfil
        const updatedModules = modules.map((module) =>
            module.id === id ? { ...module, status: 1 } : module
        );
        setModules(updatedModules);
    };

    const deactivateModule = async (id) => {
        console.log(`Deactivating profile with ID ${id}`);
        const updatedModules = modules.map((module) =>
            module.id === id ? { ...module, status: 2 } : module
        );
        setModules(updatedModules);
    };

    const editModul = (id) => {
        console.log(`Editing profile with ID ${id}`);
        // Lógica para abrir un modal o redirigir a una pantalla de edición
    };

    return { modules, loading, errorModules, getModules, activateModule, deactivateModule, editModul }
}
 