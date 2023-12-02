import axios from "./axios";

export const registerRequest = async (user) => axios.post(`/auth/register`, user);
//función para registrar usuarios, se utiliza en authContext


export const loginRequest = async (user) => axios.post(`/auth/login`, user); 

export const verifyTokenRequest = async () => axios.get(`/auth/verify`); 





/* 
La función registerRequest se crea dentro de auth aquí en API,
se utiliza dentro de la función signup dentro de authContext. Se le pasa como parámetro a user.
Signup se utiliza dentro de onSubmit y se le pasa value ( que es en sí user). Dicho value viene desde  


user en registerRequest contiene: username, email, password
----------
la función registerRequest sirve para registrar un nuevo usuario en el sistema. Toma como parámetro el objeto user que contiene:
username, email, password. y realiza una solicitud POST al endpoint /auth/register del servidor

loginRequest
se utiliza en authContext.jsx, se usa para autenticar a un usuario, toma como parámetros el email y el password del usuario 
y realiza una solicitud POST al endpoint /auth/login del servidor. Se usa para iniciar sesión  en el sistema

verifyTokenRequest se usa en authContext.jsx se encarga de verificar la validez del token de autenticación del usuario. 
Realiza una solicitud GET al endpoint. Una solicitud GET quiere decir que se obtiene información del servidor para validar el token 
almacenado. Se utiliza para mantener la sesión del usuario o redirigir al login si el token no es válido. 

*/