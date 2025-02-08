
import { Outlet } from "react-router";
export const Catalogs = () => {
  return (
    <>
        <h2>Catalogs section</h2>
        <Outlet /> 
        {/* Aquí se renderizarán las rutas hijas */}
    </>
  )
}
