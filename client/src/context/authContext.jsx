import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";//Esta librería hace todo internamente para que no tengamos que preocuparnos por el almacenamiento de cookies en el navegador.  

const AuthContext = createContext(); // aquí creamos a AuthContext

// aquí se define el hook personalizado para acceder al contexto y no se utiliza todo el contexto en sí
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  /** 
   * ? Signup es una función asíncrona que hace una solicitud HTTP al servidor para registrar un usuario.
   * *se usa en el componente Register.jsx
   */
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);//se comunica con el servidor para registrar al usuario
      if (res.status === 200) {//si la respuesta es 200, se obtiene el usuario y se autentica
        setUser(res.data);//cuando se tiene la respuesta se autentica al usuario
        setIsAuthenticated(true);//se cambia el estado de autenticación a true
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message); 
    }
  };
/**
 * ? Signin es una función asíncrona que hace una solicitud HTTP al servidor para iniciar sesión. 
 * *Se usa en el componente Login.jsx
 */
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");// Aquí se eliminan las cookies
    setUser(null);
    setIsAuthenticated(false);
  };
/** 
 * ? Aquí se verifica si el usuario está autenticado o no.
 * *Se usa en el componente App.jsx, esto es para que el usuario no pueda acceder a las rutas protegidas si no está autenticado.
 * *El useEffect dentro del AuthProvider se activa cuando este componente se monta, es decir, cuando se renderiza por primera vez.
  */

  useEffect(() => { // este useffect es para verificar si el usuario está autenticado o no usando el token almacenado en las cookies
    const checkLogin = async () => {// aquí se obtienen todas las cookies disponibles del navegador
      const cookies = Cookies.get();//método de la librería js-cookie
      if (!cookies.token) {
        setIsAuthenticated(false);// si no hay token, el usuario no está autenticado
        setLoading(false);
        return;
      }

      try {//verifyTokenRequest hace una solicitud HTTP al servidor para verificar si el token es válido
        const res = await verifyTokenRequest(cookies.token);//se pausa y se espera que se resuelva si hay token, se verifica si es válido
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);//si la respuesta no tiene datos se cambia a false, condicional: una línea
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();// se llama para ser ejecutada justo después de que es definida y de que el componente se monta. 
  }, []);//Aunque el useEffect no es una función asíncrona, se puede usar async/await dentro de él con otra función, asíncrona.

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

/*
Esto es lo que ocurre en el componente authContext.jsx:
1. Se importan las funciones de la API que se van a utilizar.
2. Se importa la librería js-cookie.
3. Se crea el contexto AuthContext.
4. Se crea el hook personalizado useAuth.
5. Se crea el componente AuthProvider.
6. Se define la función signup.
7. Se define la función signin.
8. Se define la función logout.
9. Se define el useEffect para verificar si el usuario está autenticado o no.
10. Se retorna el contexto AuthContext.Provider.
11. Se exporta el contexto AuthContext.
12. Se exporta el hook personalizado useAuth.
13. Se exporta el componente AuthProvider.

*/ 