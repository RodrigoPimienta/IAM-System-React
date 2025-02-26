// src/contexts/ErrorContext.jsx
import { createContext } from 'react';
import { useAuth, usePermissions } from "../hooks/"
import Swal from 'sweetalert2';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const { kickOut } = useAuth();
  const { refetch } = usePermissions();
  const handleGlobalError = (error) => {
    if (error?.status === 403) {
      Swal.fire({
        icon: 'warning',
        title: 'Permission Denied',
        text: 'You do not have access to this resource.',
        confirmButtonText: 'Refresh',
        timer: 4000,
        timerProgressBar: true,
        willClose: () =>{
          refetch?.();
        }
      });
    } else if (error?.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'Your session has expired.',
        confirmButtonText: 'Log Out',
        timer: 4000,
        timerProgressBar: true,
        willClose: () =>{
          kickOut?.();
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'An unexpected error occurred',
      });
    }
  };

  return (
    <ErrorContext.Provider value={{ handleGlobalError }}>
      {children}
    </ErrorContext.Provider>
  );
};
