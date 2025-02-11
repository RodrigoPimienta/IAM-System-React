import { Outlet, useNavigate } from "react-router";
import { Header, Loading } from "../components/index";
import { usePermissions } from "../hooks/usePermissions";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";

export const AdminLayout = () => {
  const { isFetching, error, refetch } = usePermissions();
  const { kickOut } = useAuth();
  const navigate = useNavigate();


  if (error && !isFetching) {
    if (error?.status === 401) {
      kickOut(error); // Cierra la sesión del usuario
      navigate("/login"); // Redirige a login
      return null; // Evita renderizar el layout mientras se redirige
    }

    Swal.fire({
      icon: "error",
      title: "Error",
      text: error?.message,
    });
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
