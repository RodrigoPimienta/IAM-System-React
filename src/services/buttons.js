const mapButtons = (data) =>{
    return data.map((button) => {
        return {
            id: button.id,
            name: button.name,
            status: button.status,
        };
    });
}

const getButtonsAPI = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
        const response = await fetch(`http://localhost:5173/src/mocks/buttons.json`);
        const data = await response.json();
        return mapButtons(data);
    } catch (e) {
        throw new Error("Error en paginateProducts");
    }
}

export { getButtonsAPI };