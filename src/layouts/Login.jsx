import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Error, Loading } from "../components";
import { useNavigate } from "react-router";

export const Login = () => {
    const { auth, login, logout, isLoading, error } = useAuth();
        
    const navigate = useNavigate();

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (auth?.id_user != null) { // ✅ Solo redirige si el usuario está autenticado
            navigate("/admin");
        }
    }, [auth?.id_user, navigate]);

    const handleLogin = () => {
        login({ email: "test@example.com", password: "123456", password_confirmation: "123456" });
    };

      // Si hay un error, mostrar un SweetAlert
      useEffect(() => {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while logging in",
          });
        }
      }, [error]);

    return (
        <>
            {isLoading && <Loading />}

            <h2>Login</h2>
            <p>Por el momento, el login está hecho con localStorage. En el futuro, se hará con un backend que devuelva un JWT Token.</p>
            <div>
                
                <button onClick={handleLogin} disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </div>
        </>
    );
};
