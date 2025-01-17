import { useContext, useEffect } from "react";
import { NavLink } from "react-router";
import { PermissionsContext } from "../context/permissions";

const order = ['users', 'modules', 'profiles'];

export const Header = () => {
  const { permissions, updatePermissions } = useContext(PermissionsContext);

  useEffect(() => {
    if (permissions === null) {
      console.log('Updating permissions');
      updatePermissions();
    }
  }, [permissions, updatePermissions]);

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
                Catalogs
              </summary>
              <ul dir="rtl">
                {
                  order.map((key) => {
                    const module = permissions?.find(p => p.key === key);

                    console.log(module);
                    if (module) {
                      return (
                        <li key={module.key}>
                          <NavLink
                            to={`/catalogs/${module.key}`}
                            className={({ isActive }) => (isActive ? "active" : "")}
                          >
                            {module.name}
                          </NavLink>
                        </li>
                      )
                    }
                    return null;
                  })
                }
                
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </header>
  )
}
