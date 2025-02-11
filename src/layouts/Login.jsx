import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export const Login = () => {
    const { auth, login, isLoading, error } = useAuth();
        
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
      if (error && !isLoading) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.message,
        });
      }

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
