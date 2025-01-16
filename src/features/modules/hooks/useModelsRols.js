import { useState } from "react";
import { getRolsAPIByModule } from "../services/modulesRols";
import { getModulAPI } from "../services/modules";

export const useModelsRols = () => {
  const [rolsData, setRolsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorRols, setErrorRols] = useState(null);

  const getRols = async (id) => {
    id = parseInt(id);
    setLoading(true);
    setErrorRols(null);
    try {
      const newRols = await getRolsAPIByModule(id);
      setRolsData(newRols[0])
    } catch (error) {
      setErrorRols(error);
    } finally {
      setLoading(false);
    }
  };

  const activateRol = async (id) => {
    console.log(`Activating profile with ID ${id}`);
    // Actualiza solo los roles en el estado
    const updatedRols = rolsData.rols.map((rol) =>
      rol.id === id ? { ...rol, status: 1 } : rol
    );
    setRolsData((prevState) => ({
      ...prevState,
      rols: updatedRols,
    }));
  };

  const deactivateRol = async (id) => {
    console.log(`Deactivating profile with ID ${id}`);
    const updatedRols = rolsData.rols.map((rol) =>
      rol.id === id ? { ...rol, status: 2 } : rol
    );
    setRolsData((prevState) => ({
      ...prevState,
      rols: updatedRols,
    }));
  };

  const editRol = (id) => {
    console.log(`Editing profile with ID ${id}`);
    // Aquí puedes implementar la lógica para editar el rol
  };

  return {
    rols: rolsData,
    loading,
    errorRols,
    getRols,
    activateRol,
    deactivateRol,
    editRol
  };
};
