import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Error, Loading } from "../components";
import { useNavigate } from "react-router";

export const Login = () => {
    const { auth, login } = useAuth();
    
    const navigate = useNavigate();

    // Redirigir si ya está logeado
    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate("/admin");
        }
    }, [auth.isLoggedIn, navigate]); // Solo se ejecuta cuando cambia `auth.isLoggedIn`

    const handleLogin = () => {
        login({ user: "testUser", password: "123456" });
    };

    return (
        <>
            <h2>Logeo</h2>
            <p>Por el momento, el logeo está hecho con localStorage. En el futuro, se hará con un backend que devuelva un JWT Token.</p>
            <div>
                {auth.loading && <Loading />}
                {auth.error && <Error message={auth.error} />}

                
                <button onClick={handleLogin} disabled={auth.loading}>
                    {auth.loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </>
    );
};
