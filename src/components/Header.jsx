import { NavLink } from "react-router";

export const Header = () => {
  return (
    <header className="container-fluid">
    <nav>
      <ul>
        <li><h1>IAM System</h1></li>
      </ul>
      <ul>
        <li>
            <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "active" : "")}
        >
            Home
        </NavLink>
        </li>
        <li>
            <NavLink
            to="/access"
            className={({ isActive }) => (isActive ? "active" : "")}
        >
            Access
        </NavLink>
        </li>
        <li>
        <details className="dropdown">
            <summary>
            Catalogs
            </summary>
            <ul dir="rtl">
            <li>
                <NavLink
                to="/catalogs/users"
                className={({ isActive }) => (isActive ? "active" : "")}
                >
                Users
                </NavLink>
            </li>
            <li>
                <NavLink
                to="/catalogs/profiles"
                className={({ isActive }) => (isActive ? "active" : "")}
                >
                Profiles
                </NavLink>
            </li>
            <li>
                <NavLink
                to="/catalogs/modules"
                className={({ isActive }) => (isActive ? "active" : "")}
                >
                Modules
                </NavLink>
            </li>
            <li>
                <NavLink
                to="/catalogs/buttons"
                className={({ isActive }) => (isActive ? "active" : "")}
                >
                Buttons
                </NavLink>
            </li>
            </ul>
        </details>
        </li>
      </ul>
    </nav>
  </header>
  )
}
