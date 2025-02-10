import { useEffect } from "react";
import { NavLink } from "react-router";
import { usePermissions } from "../hooks/usePermissions";
import Swal from "sweetalert2";
import '../styles/header.css';
import { Loading } from "./Loading";

export const Header = () => {
  const { permissions, isLoading, error, updatePermissions } = usePermissions();

  // Llamar a updatePermissions solo si no hay permisos cargados
  useEffect(() => {
    if (!permissions) {
      updatePermissions();
    }
  }, [permissions, updatePermissions]);

  // Si hay un error, mostrar un SweetAlert
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while fetching permissions",
      });
    }
  }, [error]);

  return (
    <>
      {isLoading && <Loading />}

      <header className="container-fluid">
        <nav>
          <ul>
            <li><h1>IAM System</h1></li>
          </ul>
          <ul className="menu">
            <li>
              <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <details className="dropdown">
                <summary>Sections</summary>
                <ul>
                  {permissions && Object.keys(permissions).length > 0 ? (
                    Object.entries(permissions).map(([key, value]) => (
                      <li key={key}>
                        <NavLink to={`/admin/${key}`} className={({ isActive }) => (isActive ? "active" : "")}>
                          {value.name} {/* Acceso al nombre del módulo */}
                        </NavLink>
                      </li>
                    ))
                  ) : (
                    <li>No modules.</li> // Mensaje si no hay módulos disponibles
                  )}
                </ul>
              </details>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
