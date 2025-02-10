import { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 🔹 Importar React Query
import './styles/index.css';
import './styles/app.css';
import { AuthProvider, PermissionsProvider } from './context/index';
import { PublicLayout, AdminLayout, ProtectedRoute, Login } from './layouts/index';
import { HomePublic, Users, Profiles, Modules, ModulesRols, ModulesPermissions, HomePrivate, AddUser } from './pages/index';

// 🔹 Crear un cliente de React Query
const queryClient = new QueryClient();

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <StrictMode>
      <QueryClientProvider client={queryClient}> {/* 🔹 Agregar el proveedor aquí */}
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePublic />} />
              <Route path="home" element={<HomePublic />} />
              <Route path="login" element={<Login />} />
            </Route>

            {/* Rutas protegidas (dentro del AdminLayout) */}
            <Route
              path="/admin"
              element={
                <PermissionsProvider>
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                </PermissionsProvider>
              }
            >
              <Route index element={<HomePrivate />} />
              <Route path="users" element={<Users />} />
              <Route path="users/add" element={<AddUser />} />
              <Route path="profiles" element={<Profiles />} />
              <Route path="modules" element={<Modules />} />
              <Route path="modules/:moduleId/rols" element={<ModulesRols />} />
              <Route path="modules/:moduleId/permissions" element={<ModulesPermissions />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  </AuthProvider>
);
