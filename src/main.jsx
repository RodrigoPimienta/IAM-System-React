// main.jsx
import { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import './styles/index.css';
import './styles/app.css';
import { AuthProvider } from './context/index';
import { AppRoutes, queryClient } from './routes'; // Importa AppRoutes y queryClient

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  </AuthProvider>
);