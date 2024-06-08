import axiosI from "./axios";

import { loginI, PerfilActualizarI, registrarI } from "../types/tipos";

// iniciar sesión
export const loginF = async (data: loginI) => {
  return await axiosI.post("/usuario/login", data);
};

// cerra sesión
export const logoutF = async () => {
  return await axiosI.post("/usuario/cerrar");
};

// registrar usuario
export const registrarF = async (data: registrarI) => {
  return await axiosI.post("/usuario", data);
};

// datos de usuario
export const getUsuarioF = async () => {
  return await axiosI.get("/usuario");
};

// perfil de usuario poner 
export const setFotoUserF = async (data: FormData) => {
  return await axiosI.post("/usuario/perfil", data);
};


// eliminar foto de usuario
export const deleteFotoUserF = async () => {
  return await axiosI.delete("/usuario/perfil/foto");
};


// actualizar perfil foto
export const actualizarFotoUserF = async (data: FormData) => {
  return await axiosI.put("/usuario/perfil/actualizar", data);
};


// actualizar perfil datos
export const actualizarDatosUserF = async (data: PerfilActualizarI) => {
  return await axiosI.put("/usuario", data);
};