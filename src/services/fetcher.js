export const fetcher = async (url, token, options = {}, includeToken = true) => {
    if (!token && includeToken) {
        throw new Error("No hay token de autenticación");
    }

    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || `Error ${response.status}`);
        error.status = response.status; // Agrega el código de estado al objeto de error
        throw error;
    }

    return response.json();
};
