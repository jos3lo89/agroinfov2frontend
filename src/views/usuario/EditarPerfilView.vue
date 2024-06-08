<script setup lang="ts">
import { onMounted, ref } from "vue";
import { PerfilI } from "../../types/tipos";
import { actualizarDatosUserF, getUsuarioF } from "../../service/auth.service";
import { toast } from "vue3-toastify";
import { useAuthStore } from "../../context/auth.store";

const authStore = useAuthStore();

const datosUsuario = ref({} as PerfilI);

const getUsuario = async () => {
  try {
    const res = await getUsuarioF();
    console.log(res);
    datosUsuario.value.nombre = res.data.nombre;
    datosUsuario.value.apellido = res.data.apellido;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getUsuario();
});

const actualizarDatos = async () => {
  const data = {
    nombre: datosUsuario.value.nombre,
    apellido: datosUsuario.value.apellido,
  };

  try {
    const res = await actualizarDatosUserF(data);
    console.log(res);

    getUsuario();
    authStore.datosUsuario.nombre = res.data.nombre;

    toast.success("Perfil actualizado", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  } catch (error: any) {
    console.log(error);
    error.response.data.message.forEach((error: any) => {
      toast.warning(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
  }
};
</script>

<template>
  <section class="flex flex-col items-center justify-center">
    <h3 class="my-4 font-bold text-2xl">Registrar</h3>
    <form
      @submit.prevent="actualizarDatos"
      class="px-4 md:max-w-md dark:bg-gray-800 p-4 rounded-lg mb-4"
    >
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Nombre</label
          >
          <input
            v-model="datosUsuario.nombre"
            type="text"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            autocomplete="off"
          />
        </div>
        <div>
          <label
            for="last_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Apellido</label
          >
          <input
            v-model="datosUsuario.apellido"
            type="text"
            id="last_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            autocomplete="off"
          />
        </div>
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Registrar
      </button>
    </form>
  </section>
</template>

<style scoped></style>
