import { Outlet } from "react-router";
import { usePermissions, useError } from "../hooks/";
import { Header, Loading } from "../components/index";

export const AdminLayout = () => {
  const { isFetching, error, refetch } = usePermissions();
  const { handleGlobalError } = useError();

  if(error && !isFetching){
    handleGlobalError(error);
  }

  return (
    <div>
      {isFetching && <Loading />}
      <Header />

      <button onClick={() => refetch()}>refresh permissions</button>

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
