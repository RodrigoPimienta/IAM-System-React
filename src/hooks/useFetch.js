import { useState, useContext } from "react";
import { AuthContext } from "../context/auth";

export const useFetch = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);

    // Función para hacer peticiones GET
    const requestGet = async (url, options = {}) => {
        return await request(url, { method: "GET", ...options });
    };

    // Función para hacer peticiones POST
    const requestPost = async (url, body, options = {}) => {
        return await request(url, { method: "POST", body: JSON.stringify(body), ...options });
    };

    // Función para hacer peticiones PUT
    const requestPut = async (url, body, options = {}) => {
        return await request(url, { method: "PUT", body: JSON.stringify(body), ...options });
    };

    // Función para hacer peticiones DELETE
    const requestDelete = async (url, options = {}) => {
        return await request(url, { method: "DELETE", ...options });
    };

    // Función general para realizar la solicitud
    const request = async (url, options = {}) => {
        setLoading(true);
        setError(null);

        if(!auth.token == null) {
            throw new Error("No se ha iniciado sesión");
        }

        try {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
                ...options.headers, // Sobrescribir encabezados si es necesario
            };

            // Realizar la petición
            const response = await fetch(url, { ...options, headers });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en la solicitud");
            }

            return await response.json(); // Devuelve el JSON de la respuesta
        } catch (err) {
            setError(err.message || "Error inesperado");
            throw err; // Propagar el error
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, requestGet, requestPost, requestPut, requestDelete };
};
