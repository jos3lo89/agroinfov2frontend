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

  // datos de usuario
  export interface registrarI {
    nombre: string;
    apellido: string;
    correo: string;
    clave: string;
  }

  // datos de usuario Perfil
  export interface PerfilI {
    id: string
    nombre: string
    apellido: string
    correo: string
    rol: string
    foto_url: string | null
    foto_id: string | null
    fecha_creacion: string
    fecha_actualizacion: string
  }
  

  // datos de usuario Perfil actualizar
  export interface PerfilActualizarI {
    nombre: string
    apellido: string
  }


  // actualizar clave
  export interface clavesI {
    clave: string
    nuevaClave: string
  }