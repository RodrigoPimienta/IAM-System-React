import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './styles/index.css'
import './styles/app.css'
import { AuthProvider, PermissionsProvider } from './context/index';
import { PublicLayout, AdminLayout, ProtectedRoute, Login } from './layouts/index'
import { HomePublic, Catalogs, Users, Profiles, Modules, ModulesRols, ModulesPermissions, HomePrivate } from './pages/index'

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePublic />} /> {/* Página de inicio pública */}
            <Route path="home" element={<HomePublic />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* Rutas protegidas (dentro del AdminLayout) */}
          <Route
            path="/admin"
            element={
              <PermissionsProvider> {/* Solo envuelve las rutas protegidas */}
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              </PermissionsProvider>
            }
          >
            <Route index element={<HomePrivate />} />
            <Route path="catalogs" element={<Catalogs />} >
              <Route index element={<Users />} />
              <Route path="users" element={<Users />} />
              <Route path="profiles" element={<Profiles />} />
              <Route path="modules" element={<Modules />} />
              <Route path="modules/:moduleId/rols" element={<ModulesRols />} />
              <Route path="modules/:moduleId/permissions" element={<ModulesPermissions />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>
);
