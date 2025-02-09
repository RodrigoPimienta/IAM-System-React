import { fetcher } from "./fetcher";

export const loginAPI = async (data) => {
    try {
        const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' // Important: Include Accept header
            },
            body: JSON.stringify(data) // Use the 'data' parameter, not jsonData
        });

        if (!response.ok) { // Check for HTTP errors FIRST
            const errorData = await response.json(); // Try to parse error for better message
            return {
                error: true,
                message: errorData.message || `HTTP error! status: ${response.status}`, // Include status code
                data: null
            };
        }

        return await response.json(); // Now it's safe to parse
    } catch (error) {
        return {
            error: true,
            message: error.message || 'Unexpected error occurred', // Include error message
            data: null
        };
    }
};

export const loginUser = async (credentials) => 
    fetcher("http://localhost:8000/api/auth/login", null, { method: "POST", body: JSON.stringify(credentials) },false);

export const getPermissions = async (token) => fetcher("http://localhost:8000/api/auth/permissions", token);

export const logoutUser = async (token) => fetcher("http://localhost:8000/api/auth/logout", token, { method: "POST" });