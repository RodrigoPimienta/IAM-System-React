import { fetcher } from "../../../services/fetcher";

export const getUsers = async (token) => fetcher("http://localhost:8000/api/users", token);

export const createUser = async (token,userData) => 
    fetcher("http://localhost:8000/api/users",token, { method: "POST", body: JSON.stringify(userData) });

export const updateUser = async (token,id, userData) => 
    fetcher(`http://localhost:8000/api/users/${id}`,token, { method: "PUT", body: JSON.stringify(userData) });

export const updateUserStatus = async (token,id, status) => 
    fetcher(`http://localhost:8000/api/users/${id}/status`,token, { method: "PATCH", body: JSON.stringify({ status }) });

export const updateUserPassword = async (token,id, password) => 
    fetcher(`http://localhost:8000/api/users/${id}/password`,token, { method: "PATCH", body: JSON.stringify({ password, password_confirmation: password }) });

