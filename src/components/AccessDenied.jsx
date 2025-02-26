// src/components/AccessDenied.jsx
import { useNavigate } from 'react-router';

function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Acceso Denegado</h2>
      <p>No tienes permisos para acceder a este módulo.</p>
      <button onClick={() => navigate('/admin')}>Volver al Admin</button>
    </div>
  );
}

export default AccessDenied;