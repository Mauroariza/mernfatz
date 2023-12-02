import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)
  /** 
   *?isAuthenticated es un booleano que indica si el usuario está autenticado o no.
    */

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Task Manager</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? ( /**Aquí se pregunta para saber si mostrar el agregar tarea y logout */
          <>
            <li>
              Welcome {user.username}
            </li>
            <li>
              <ButtonLink to="/add-task">Add Task</ButtonLink>
            </li>
            <li> /
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (/** en caso de que no esté auténticado se va a mostrar el login o el Register para que lo haga */
          <>
            <li>
              <ButtonLink to="/login">Login</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Register</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

/*
Esto es lo que ocurre en el componente de NavBar.jsx:
1. Se importa el hook useAuth del contexto de autenticación.
2. Se crea el componente Navbar.
3. Se obtienen las propiedades del hook useAuth como: isAuthenticated, logout, user.
4. Se retorna el componente Navbar.
5. Se exporta el componente Navbar.

la función logout() se ejecuta cuando el usuario hace clic en el botón de logout. Esta se
encarga de eliminar el token de las cookies y de redirigir al usuario a la página de inicio.

user es un objeto que contiene la información del usuario autenticado. Este objeto tiene las
propiedades: id, username, email, createdAt, updatedAt. Pero aquí solo se usa la propiedad
username para mostrar el nombre del usuario autenticado en el navbar.


*/