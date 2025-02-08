import { useState } from "react";
import { getPermissionsAPIByModule } from "../services/modulesPermissions";

export const useModelsPermissions = () => {

    const [permissionsData, setPermissionsData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [errorPermissions, setErrorPermissions] = useState(null);

    const getPermissions = async (id) => {
        id = parseInt(id);
        setLoading(true);
        setErrorPermissions(null);
        try {
            const newPermissions = await getPermissionsAPIByModule(id);
            setPermissionsData(newPermissions[0]);
        } catch (error) {
            setErrorPermissions(error);
        } finally {
            setLoading(false);
        }
    };

    const activatePermission = async (id) => {
        console.log(`Activating profile with ID ${id}`);
        // Actualiza solo los roles en el estado
        const updatedPermissions = permissionsData.permissions.map((permission) =>
            permission.id === id ? { ...permission, status: 1 } : permission
        );
        setPermissionsData((prevState) => ({
            ...prevState,
            permissions: updatedPermissions,
        }));
    };

    const deactivatePermission = async (id) => {
        console.log(`Deactivating profile with ID ${id}`);
        const updatedPermissions = permissionsData.permissions.map((permission) =>
            permission.id === id ? { ...permission, status: 2 } : permission
        );
        setPermissionsData((prevState) => ({
            ...prevState,
            permissions: updatedPermissions,
        }));
    };

    const editPermission = (id) => {
        console.log(`Editing profile with ID ${id}`);
        // Aquí puedes implementar la lógica para editar el rol
    };

    return {
        permissions: permissionsData,
        loading,
        errorPermissions,
        getPermissions,
        activatePermission,
        deactivatePermission,
        editPermission,
    };
}
