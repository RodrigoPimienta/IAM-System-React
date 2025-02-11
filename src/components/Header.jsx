import { NavLink } from "react-router";
import { usePermissions } from "../hooks/usePermissions";
import '../styles/header.css';

export const Header = () => {
  const { permissions } = usePermissions();

  return (
    <>
      <header className="container-fluid">
        <nav>
          <ul>
            <li><h1>IAM System</h1></li>
          </ul>
          <ul className="menu">
            <li>
              <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>
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
