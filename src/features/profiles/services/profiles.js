const mapProfiles = (data) => {
    return data.map((profile) => {
        return {
        id: profile.id,
        name: profile.name,
        status: profile.status,
        };
    });
}

const getProfilesAPI = async () => {

    // dormir 2 segundos

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        const response = await fetch(`http://localhost:5173/src/mocks/profiles.json`);
        const data = await response.json();
        return mapProfiles(data);
    } catch (e) {
        throw new Error("Error en paginateProducts");
    }
}

export { getProfilesAPI };