import { Outlet } from "react-router";
import {Header} from "../components/index";

export const AdminLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Aquí se renderizan las rutas hijas del AdminLayout */}
      </main>
    </div>
  );
};

