import { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router";
import { PermissionsContext } from "../context/permissions";

export const Header = () => {
  const { permissions, updatePermissions } = useContext(PermissionsContext);
  const fetched = useRef(false); // Bandera para evitar doble ejecución

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      updatePermissions();
    }
  }, []); // Se ejecuta solo una vez al montar

  return (
    <header className="container-fluid">
      <nav>
        <ul>
          <li><h1>IAM System</h1></li>
        </ul>
        <ul className="menu">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <details className="dropdown">
              <summary>
                Sections
              </summary>
              <ul dir="rtl">
              {permissions && Object.keys(permissions).length > 0 ? (
                  Object.keys(permissions).map((key) => (
                    <li key={key}> {/* key prop is important here */}
                      <NavLink
                        to={`/admin/catalogs/${key}`} // Use the key directly
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        {permissions[key].name} {/* Access the name using the key */}
                      </NavLink>
                    </li>
                  ))
                ) : (
                  <li>No modules.</li> // Mensaje si no hay permisos
                )}
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </header>
  )
}
