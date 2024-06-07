<script setup lang="ts">
import { reactive } from "vue";
import { loginF } from "../service/auth.service";
import { useAuthStore } from "../context/auth.store";

const authStore = useAuthStore();

const datosUsuario = reactive({
  correo: "",
  clave: "",
});

const login = async () => {
  try {
    const res = await loginF(datosUsuario);
    console.log(res);
    authStore.token = true;
    authStore.roles = res.data.rol;
    authStore.datosUsuario.nombre = res.data.nombre;
    authStore.datosUsuario.foto = res.data.foto_url;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <form @submit.prevent="login" class="max-w-sm mx-auto">
    <div class="mb-5">
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Tu correo electrónico</label
      >
      <input
        type="email"
        id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="nombre@ejemplo.com"
        required
        v-model="datosUsuario.correo"
      />
    </div>
    <div class="mb-5">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Su contraseña</label
      >
      <input
        type="password"
        id="password"
        placeholder="********"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        v-model="datosUsuario.clave"
      />
    </div>

    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Iniciar sesión
    </button>
  </form>
</template>

<style scoped></style>
