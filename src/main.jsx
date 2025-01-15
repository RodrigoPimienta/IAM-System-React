import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import {Catalogs, Home, Access, Users, Modules, Profiles, Rols, Buttons} from "./pages/index"


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta principal que incluye el Header y las rutas hijas */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/access" element={<Access />} />
          <Route path="/catalogs" element={<Catalogs />}>
            <Route index element={<Users />} />
            <Route path="users" element={<Users />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="modules" element={<Modules />} />
            <Route path="modules/:moduleId/rols" element={<Rols />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
