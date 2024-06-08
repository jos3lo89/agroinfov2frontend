<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  getUsuarioF,
  setFotoUserF,
  deleteFotoUserF,
  actualizarFotoUserF,
} from "../../service/auth.service";
import { PerfilI } from "../../types/tipos";
import { toast } from "vue3-toastify";
import { useAuthStore } from "../../context/auth.store";
import { useRouter } from "vue-router";
import ModalEliminarAccC from "../../components/usuario/ModalEliminarAccC.vue";

const router = useRouter();

const authStore = useAuthStore();

const datosUsuario = ref({} as PerfilI);

const openMenuOpciones = ref(false);

const fotoUserNoFoto = {
  src: "user.webp",
  alt: "foto de usuario no registrado",
};

const getUsuario = async () => {
  try {
    const res = await getUsuarioF();
    console.log(res);
    datosUsuario.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getUsuario();
});

const photoTemp = ref<File | null>(null);
const fotito = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

const handleChangePhoto = (e: any) => {
  const file = e.target.files[0];
  if (file) {
    photoTemp.value = file;
    fotito.value = URL.createObjectURL(file);
  }
};

const subirFoto = async () => {
  if (photoTemp.value) {
    const formData = new FormData();
    formData.append("perfil", photoTemp.value);

    try {
      const res = await setFotoUserF(formData);
      console.log(res);

      if (res.status == 200) {
        authStore.datosUsuario.foto = res.data.foto_url;
        toast.success("Foto de perfil subida", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        });

        photoTemp.value = null;
        fotito.value = "";
        if (fileInput.value) {
          fileInput.value.value = "";
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status == 400) {
        toast.warning("Ya tienes una foto de perfil", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        });
      }
    }
  }
};

const actualizarFoto = async () => {
  if (photoTemp.value) {
    const formData = new FormData();
    formData.append("perfil", photoTemp.value);

    try {
      const res = await actualizarFotoUserF(formData);
      console.log(res);

      if (res.status == 200) {
        authStore.datosUsuario.foto = res.data.foto_url;
        toast.success("Foto de perfil actualizada", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1500,
        });

        photoTemp.value = null;
        fotito.value = "";
        if (fileInput.value) {
          fileInput.value.value = "";
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status == 400) {
        error.response.data.message.forEach((error: any) => {
          toast.warning(error, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500,
          });
        });
      }
    }
  }
};

const eliminarFoto = async () => {
  try {
    const res = await deleteFotoUserF();
    console.log(res);

    if (res.status == 200) {
      authStore.datosUsuario.foto = null;
      toast.success("Foto de perfil eliminada", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    }
  } catch (error: any) {
    console.log(error);
    if (error.response.status == 404) {
      toast.warning("No tienes una foto de perfil", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    }
  }
};

const openModalEliminarAcc = ref(false);

const showModales = () => {
  openModalEliminarAcc.value = !openModalEliminarAcc.value;
  openMenuOpciones.value = !openMenuOpciones.value;
};
</script>

<template>
  <section class="flex flex-col md:flex-row justify-around gap-3">
    <div class="bg-gray-100 shadow-lg p-4 rounded-lg dark:bg-gray-800">
      <!-- <div class="absolute bottom-0 right-0 flex items-center gap-2.5"> -->

      <!-- </div> -->

      <div class="text-center mb-3">
        <h3 class="text-2xl">Mis Datos</h3>
      </div>
      <div>
        <p class="text-orange-600">
          Nombre:
          <span class="text-black dark:text-white">{{
            datosUsuario.nombre
          }}</span>
        </p>
        <p class="text-orange-600">
          Apellido:
          <span class="text-black dark:text-white">{{
            datosUsuario.apellido
          }}</span>
        </p>
        <p class="text-orange-600">
          Correo:
          <span class="text-black dark:text-white">{{
            datosUsuario.correo
          }}</span>
        </p>
        <p class="text-orange-600">
          Rol:
          <span class="text-black dark:text-white">{{ datosUsuario.rol }}</span>
        </p>
        <p class="text-orange-600">
          Fecha creación:
          <span class="text-black dark:text-white">{{
            new Date(datosUsuario.fecha_creacion).toLocaleString("es-PE")
          }}</span>
        </p>
        <p class="text-orange-600">
          Fecha actualización:
          <span class="text-black dark:text-white">{{
            new Date(datosUsuario.fecha_actualizacion).toLocaleString("es-PE")
          }}</span>
        </p>
      </div>
      <div class="mt-3 relative flex justify-start items-center">
        <button
          @click="router.push({ name: 'editar_perfil' })"
          type="button"
          class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Editar
        </button>
        <button
          @click="openMenuOpciones = !openMenuOpciones"
          type="button"
          class="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-900"
        >
          Opciones
        </button>
        <div
          v-if="openMenuOpciones"
          class="z-10 absolute left-0 right-0 -top-24 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Cambiar contraseña</a
              >
            </li>
            <li>
              <button
                @click="showModales"
                type="button"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Eliminar cuenta
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 shadow-lg p-4 rounded-lg dark:bg-gray-800">
      <div class="text-center mb-3">
        <h3 class="text-2xl">Mi foto</h3>
      </div>
      <div>
        <div class="flex items-center justify-center">
          <div>
            <img
              v-if="authStore.datosUsuario.foto == null"
              :src="fotoUserNoFoto.src"
              :alt="fotoUserNoFoto.alt"
              class="w-32 h-32 rounded-lg"
            />
            <img
              v-else
              :src="authStore.datosUsuario.foto"
              :alt="datosUsuario.foto_url ?? 'Foto de usuario no registrado'"
              class="w-32 h-32 rounded-lg"
            />
          </div>
          <div>
            <img
              v-if="fotito != ''"
              :src="fotito"
              class="w-32 h-32 rounded-lg"
            />
          </div>
        </div>

        <div>
          <div class="py-3">
            <input
              class="block w-full p-1 file:cursor-pointer text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:border-none file:bg-gray-50 file:text-gray-900 file:dark:text-white file:dark:bg-gray-700 file:dark:border-gray-600 file:focus:ring-0 file:focus:outline-none file:ring-0 file:placeholder-gray-400"
              id="file_input"
              type="file"
              ref="fileInput"
              @change="handleChangePhoto"
            />
          </div>

          <button
            v-if="authStore.datosUsuario.foto == null"
            @click="subirFoto"
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Subir foto
          </button>

          <button
            v-else
            @click="actualizarFoto"
            type="button"
            class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Cambiar
          </button>
          <button
            @click="eliminarFoto"
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </section>

  <ModalEliminarAccC
    :abrir="openModalEliminarAcc"
    @close="openModalEliminarAcc = !openModalEliminarAcc"
  />
</template>

<style scoped></style>
