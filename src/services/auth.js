import { fetcher } from "./fetcher";

export const loginUser = async (credentials) => 
    fetcher("http://localhost:8000/api/auth/login", null, { method: "POST", body: JSON.stringify(credentials) },false);

export const getPermissions = async (token) => fetcher("http://localhost:8000/api/auth/permissions", token);

export const logoutUser = async (token) => fetcher("http://localhost:8000/api/auth/logout", token, { method: "POST" });