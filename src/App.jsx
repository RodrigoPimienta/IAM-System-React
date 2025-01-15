
import { Header } from "./components/Header"
import { Outlet } from "react-router";

function App() {
  return (
    <>
        <Header />
        <main className="container-fluid">
          <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
        </main>
    </>
  )
}

export default App
