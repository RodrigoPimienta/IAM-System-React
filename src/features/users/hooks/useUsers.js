import {useState} from 'react'
import { getUsersAPI } from '../services/users'
export const useUsers = () => {
    const [resUsers, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorUsers, setErrorUsers] = useState(null)


    const getUsers = async () => {
        setLoading(true)
        setErrorUsers(null)
        try {
            const newUsers = await getUsersAPI()
            setUsers(newUsers)
        } catch (error) {
            setErrorUsers(error)
        } finally {
            setLoading(false)
        }
    }

    const activateUser = async (id) => {
        console.log(`Activating user with ID ${id}`);
        // Aquí podrías llamar a una API para activar al usuario
        const updatedUsers = resUsers.map((user) =>
            user.id === id ? { ...user, status: 1 } : user
        );
        setUsers(updatedUsers);
    };

    const deactivateUser = async (id) => {
        console.log(`Deactivating user with ID ${id}`);
        const updatedUsers = resUsers.map((user) =>
            user.id === id ? { ...user, status: 2 } : user
        );
        setUsers(updatedUsers);
    };

    const editUser = (id) => {
        console.log(`Editing user with ID ${id}`);
        // Lógica para abrir un modal o redirigir a una pantalla de edición
    };

    return { resUsers, loading, errorUsers, getUsers, activateUser, deactivateUser, editUser }
}
