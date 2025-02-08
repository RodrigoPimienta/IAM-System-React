import { Outlet } from "react-router";
import {Header} from "../components/index";

export const AdminLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Aquí se renderizan las rutas hijas del AdminLayout */}
      </main>
      <footer>
        <nav>
          <ul>
            <li><a href="www.linkedin.com/in/rodigopimienta" target="_blank">LinkedIn</a></li>
            <li><a href="https://github.com/tu-repo-del-proyecto" target="_blank">Repositorio del Proyecto</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

