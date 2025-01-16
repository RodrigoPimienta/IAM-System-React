const mapRols = (data) => {
    return data.map((module) => ({
        moduleId: module.moduleId,
        module: module.module,
        rols : module.rols.map((rol) => ({
            id: rol.id,
            name: rol.name,
            status: rol.status
        }))
    }));
}

const getRolsAPIByModule = async (moduleId) => {
    // sleep 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        const response = await fetch(`http://localhost:5173/src/mocks/modulesRols.json`);
        const data = await response.json();
        const rols = data.filter((rol) => rol.moduleId === moduleId);
        return mapRols(rols);
    } catch (e) {
        throw new Error("Error en getMRolsAPI");
    }
}

export { getRolsAPIByModule }; 