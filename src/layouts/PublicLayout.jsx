import { Outlet } from "react-router";

export const PublicLayout = () => {
  return (
    <div>
      <header>
        <h1>Bienvenido a Pimi IAM System</h1>
      </header>
      <main>
        <Outlet /> {/* Aquí se renderizan las rutas hijas del PublicLayout */}
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

