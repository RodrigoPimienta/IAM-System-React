// importar mocks de access
// import { Home } from "./pages/Home"
import {Home, Access, Modules, Profiles, Rols, Buttons} from "./pages/index"


function App() {
  return (
    <>
        <header className="container-fluid">
          <nav>
            <ul>
              <li><strong>IAM System</strong></li>
            </ul>
            <ul>
              <li><a href="#">Users</a></li>
              <li><a href="#">Profiles</a></li>
              <li><a href="#">Modules</a></li>
              <li><a href="#">Buttons</a></li>
            </ul>
          </nav>
        </header>
        <main className="container-fluid">
            {/* Aqui se supone que ira la seccion principal que seran accesos */}
            <Home />
        </main>
    </>
  )
}

export default App
