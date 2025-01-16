
import { Header } from "./components/index"
import { Outlet } from "react-router";
import './App.css'

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
