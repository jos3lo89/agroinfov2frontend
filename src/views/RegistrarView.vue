<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { registrarF } from "../service/auth.service";
import { registrarI } from "../types/tipos";
import { toast } from "vue3-toastify";

const confirmPassword = ref("");
const confirmPasswordError = ref("");

const data = reactive<registrarI>({
  nombre: "",
  apellido: "",
  correo: "",
  clave: "",
});

const registrar = async () => {
  try {
    const res = await registrarF(data);
    console.log(res);

    if (res.status == 201) {
      toast.success("Usuario registrado", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
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
};

watch(
  [() => data.clave, () => confirmPassword.value],
  ([newClave, newConfirmPassword]) => {
    if (newClave !== newConfirmPassword && confirmPassword.value != "") {
      confirmPasswordError.value = "Las contraseñas no coinciden";
    } else {
      confirmPasswordError.value = "";
    }
  }
);
</script>

<template>
  <section class="flex flex-col items-center justify-center">
    <h3 class="my-4 font-bold text-2xl">Registrar</h3>
    <form
      @submit.prevent="registrar"
      class="px-4 md:max-w-md dark:bg-gray-800 p-4 rounded-lg mb-4 shadow-lg"
    >
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Nombre</label
          >
          <input
            v-model="data.nombre"
            type="text"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Rem"
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
            v-model="data.apellido"
            type="text"
            id="last_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ram"
            required
            autocomplete="off"
          />
        </div>
      </div>
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Dirección de correo electrónico</label
        >
        <input
          v-model="data.correo"
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="rem.ram@juice.com"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Contraseña</label
        >
        <input
          v-model="data.clave"
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="•••••••••"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="confirm_password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Confirmar Contraseña</label
        >
        <input
          v-model="confirmPassword"
          type="password"
          id="confirm_password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="•••••••••"
          required
        />
        <span
          :class="{
            'text-red-500': confirmPasswordError,
            hidden: confirmPasswordError == '',
          }"
        >
          {{ confirmPasswordError }}
        </span>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Registrar
      </button>
    </form>
    <div class="mb-5">
      <p>
        Ya tienes cuenta?
        <RouterLink class="text-blue-600" :to="{ name: 'login' }">
          inicia sesión aquí.</RouterLink
        >
      </p>
    </div>
  </section>
</template>

<style scoped></style>
