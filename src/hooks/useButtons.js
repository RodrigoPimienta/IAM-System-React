import { useState } from "react"
import { getButtonsAPI } from "../services/buttons"

export const useButtons = () => {
  
    const [buttons, setButtons] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorButtons, setErrorButtons] = useState(null)

    const getButtons = async () => {
        setLoading(true)
        setErrorButtons(null)
        try {
            const newButtons = await getButtonsAPI()
            setButtons(newButtons)
        } catch (error) {
            setErrorButtons(error)
        } finally {
            setLoading(false)
        }
    };

    const activateButton = async (id) => {
        console.log(`Activating button with ID ${id}`);
        // Aquí podrías llamar a una API para activar al perfil
        const updatedButtons = buttons.map((button) =>
            button.id === id ? { ...button, status: 1 } : button
        );
        setButtons(updatedButtons);
    };

    const deactivateButton = async (id) => {
        console.log(`Deactivating button with ID ${id}`);
        const updatedButtons = buttons.map((button) =>
            button.id === id ? { ...button, status: 2 } : button
        );
        setButtons(updatedButtons);
    };

    const editButton = (id) => {
        console.log(`Editing button with ID ${id}`);
        // Lógica para abrir un modal o redirigir a una pantalla de edición
    };

    return { buttons, loading, errorButtons, getButtons, activateButton, deactivateButton, editButton }
}
