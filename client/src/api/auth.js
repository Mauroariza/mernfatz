import axios from "./axios";

export const registerRequest = async (user) =>
  axios.post(`/auth/register`, user);

export const loginRequest = async (user) => axios.post(`/auth/login`, user); 

export const verifyTokenRequest = async () => axios.get(`/auth/verify`); 



/* 
La función registerRequest se crea dentro de auth aquí en API,
se utiliza dentro de la función signup dentro de authContext. Se le pasa como parámetro a user.
Signup se utiliza dentro de onSubmit y se le pasa value ( que es en sí user). Dicho value viene desde 


user en registerRequest contiene: username, email, password




*/