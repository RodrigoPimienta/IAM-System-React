import { fetcher } from "../../../services/fetcher";

export const getModules = async (token) => fetcher("http://localhost:8000/api/modules", token);

export const createModule = async (token,userData) => 
    fetcher("http://localhost:8000/api/modules",token, { method: "POST", body: JSON.stringify(userData) });

export const updateModule = async (token,id, userData) => 
    fetcher(`http://localhost:8000/api/modules/${id}`,token, { method: "PUT", body: JSON.stringify(userData) });

export const updateModuleStatus = async (token,id, status) => 
    fetcher(`http://localhost:8000/api/modules/${id}/status`,token, { method: "PATCH", body: JSON.stringify({ status }) });

