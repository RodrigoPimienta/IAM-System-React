import { Outlet } from "react-router";

export const PublicLayout = () => {
  return (
    <div>
      <header>
        <h1>Bienvenido a IAM System</h1>
      </header>
      <main>
        <Outlet /> {/* Aquí se renderizan las rutas hijas del PublicLayout */}
      </main>
    </div>
  );
};

