import { useNavigate } from "react-router"

export const HomePublic = () => {

  const navigate = useNavigate()

  const handelLogin = () => {
    navigate('/login')
  }

  return (
    <div className="container-fluid">


    <section id="inicio">
      <h2>Bienvenido</h2>
      <p>Esta página está hecha para probar mis habilidades en React haciendo un sistema IAM. Por el momento, solamente está funcionando el frontend con localStorage, pero en el futuro usará un backend para incluir validaciones por JWT Token.</p>
    </section>

    <section id="sobre-mi">
      <h2>Sobre Mi</h2>
      <p>Mi nombre es Rodrigo Pimienta y soy un desarrollador fullstack con dos años de experiencia. A modo de probar mis habilidades en el frontend y retomar React, decidí hacer este proyecto. También quiero tener una prueba tangible de mis habilidades con React para facilitar conseguir trabajo en el futuro.</p>
    </section>

    <section id="futuro">
      <h2>En el Futuro</h2>
      <p>La idea de este repositorio es que termine con 4 ramas principales, las cuales representen el proyecto terminado en diferentes etapas:</p>
      <ul>
        <li>React vanilla + LocalStorage</li>
        <li>React vanilla + Backend + Autenticación JWT</li>
        <li>React Redux + Backend + Autenticación JWT</li>
        <li>React Zustand + Backend + Autenticación JWT</li>
      </ul>
    </section>

    <section id="logeo">
      <h2>Logeo</h2>
      <p>Por el momento, el logeo está hecho con localStorage. En el futuro, se hará con un backend que devuelva un JWT Token.</p>
      <button onClick={handelLogin} className="btn btn-primary">Logeo</button>
    </section>
        
    </div>
  )
}
