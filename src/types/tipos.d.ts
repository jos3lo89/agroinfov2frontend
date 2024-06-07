// inicar sesión
export interface loginI {
    correo: string;
    clave: string;
  }

  // datos de usuario authStore
  export interface authUserI {
    nombre: string;
    foto: string | null;
  }