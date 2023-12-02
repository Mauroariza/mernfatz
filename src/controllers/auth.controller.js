import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.creation.js";

/**
 *? función de registro de usuario. Se utiliza en el endpoint /auth/register

 */

export const register = async (req, res) => { 
  try {
    const { username, email, password } = req.body;//extraemos los datos del body de la petición

    const userFound = await User.findOne({ email });//buscamos en la base de datos si ya existe un usuario con ese email

    if (userFound)//si ya existe un usuario con ese email, retornamos un error
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    // hashing the password es para encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Aquí se crea el nuevo usuario en la base de datos
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // saving the user in the database
    const userSaved = await newUser.save();// aquí se guarda el usuario en la base de datos y mongoose le asigna un id

    // aquí se hace el llamado a la función que crea el token en el archivo jwt y se le pasa el payload
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {// aquí estoy utilizando el objeto res que viene desde express y su método cookie() para crearla
      httpOnly: process.env.NODE_ENV !== "development",//será true si no estamos en desarrollo es decir en producción
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 *? función de login de usuario. Se utiliza en el endpoint /auth/login

 */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/**
 *? función de verifyToken de usuario. Se utiliza en el endpoint /auth/verify
 */

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

/**
 *? función de logout de usuario. Se utiliza en el endpoint /auth/logout
 */
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};






/*
Las principales acciones de auth.controller.js son:
1. Crear un nuevo usuario con un nombre de usuario, correo electrónico y contraseña 
2. Autenticar un usuario con un correo electrónico y una contraseña y generar un token de acceso que es una cookie
3. Verificar el token de autenticación del usuario para mantener la sesión del usuario
4. Cerrar sesión de un usuario eliminando la cookie del token de acceso

*/