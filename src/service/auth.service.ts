import axiosI from "./axios";

import { loginI } from "../types/tipos";


// iniciar sesión
export const loginF = async (data: loginI) => {
  return await axiosI.post("/usuario/login", data);
};

// cerra sesión
export const logoutF = async () => {
    return await axiosI.post("/usuario/cerrar");
  };