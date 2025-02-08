const mapPermissions = (data) => {
    return data.map((module) => ({
        moduleId: module.moduleId,
        module: module.module,
        permissions: module.mapPermissions.map((permission) => ({
            id: permission.id,
            name: permission.name,
            status: permission.status
        }))
    }));
}

const getPermissionsAPIByModule = async (moduleId) => {
    // sleep 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        const response = await fetch(`http://localhost:5173/src/mocks/modulesPermissions.json`);
        const data = await response.json();
        const permissions = data.filter((permission) => permission.moduleId === moduleId);
        return mapPermissions(permissions);
    } catch (e) {
        throw new Error("Error en getPermissionsAPIByModule");
    }
}

export { getPermissionsAPIByModule };