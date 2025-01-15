const mapModules = (data) => {
    return data.map((profile) => {
        return {
        id: profile.id,
        name: profile.name,
        status: profile.status,
        };
    });
}

const getModulesAPI = async () => {

    // dormir 2 segundos

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        const response = await fetch(`http://localhost:5173/src/mocks/modules.json`);
        const data = await response.json();
        return mapModules(data);
    } catch (e) {
        throw new Error("Error en paginateProducts");
    }
}

export { getModulesAPI }; 