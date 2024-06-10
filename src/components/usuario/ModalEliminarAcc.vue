<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import { eliminarUsuarioF, logoutF } from "../../service/auth.service";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../context/auth.store";

const authStore = useAuthStore();

const router = useRouter();

const props = defineProps({
  abrir2: Boolean,
});

const emits = defineEmits(["close2"]);

const close2 = () => {
  emits("close2");
};

const passwordOk = ref(false);

const claves = reactive({
  password: "",
  confirmPassword: "",
  confirmPasswordError: "",
});

watch(
  [() => claves.password, () => claves.confirmPassword],
  ([password, confirmPassword]) => {
    if (password !== confirmPassword && confirmPassword != "") {
      claves.confirmPasswordError = "no coincide";
      passwordOk.value = false;
    } else {
      claves.confirmPasswordError = "";
      passwordOk.value = true;
    }
  }
);

const handleDeleteUser = async () => {
  if (passwordOk.value) {
    const usuario2 = {
      clave: claves.password,
    };

    try {
      const res = await eliminarUsuarioF(usuario2);
      console.log(res);
      close2();
      //   toast.success("Cuenta eliminada con éxito", {
      //     position: toast.POSITION.BOTTOM_RIGHT,
      //     autoClose: 1500,
      //   });

      await logoutF();

      authStore.token = false;
      authStore.roles = "visitante";
      authStore.datosUsuario.nombre = "";
      authStore.datosUsuario.foto = null;
      router.push({ name: "inicio" });
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400) {
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
</script>

<template>
  <div
    v-if="props.abrir2"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div @click="close2" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>

    <dialog
      :open="props.abrir2"
      class="z-60 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg relative"
    >
      <button
        @click="close2"
        class="absolute p-2 rounded shadow-xl bg-gray-300 dark:bg-slate-600 right-0 top-0 hover:bg-red-500 hover:text-white"
      >
        <svg
          class="w-5 h-5"
          data-slot="icon"
          data-darkreader-inline-stroke=""
          fill="none"
          stroke-width="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <div class="text-center mb-3 mt-10 md:mt-4">
        <strong class="text-xl font-semibold">Eliminar mi cuenta</strong>
      </div>

      <form
        @submit.prevent="handleDeleteUser"
        class="dark:bg-gray-800 p-4 rounded-lg mb-4"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="md:mb-5">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Su contraseña</label
            >
            <input
              v-model="claves.password"
              type="password"
              id="password"
              placeholder="********"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div class="md:mb-5">
            <label
              for="confirm_password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >confirma su contraseña</label
            >
            <input
              v-model="claves.confirmPassword"
              type="password"
              id="confirm_password"
              placeholder="********"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <span
              :class="{
                'text-red-500': claves.confirmPasswordError,
                hidden: claves.confirmPasswordError == '',
              }"
            >
              {{ claves.confirmPasswordError }}
            </span>
          </div>
        </div>

        <button
          :disabled="!passwordOk"
          type="submit"
          class="bg-transparent border hover:text-white hover:border-red-600 hover:bg-red-600 mt-2 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-transparent dark:hover:bg-red-800"
        >
          Eliminar cuenta
        </button>
      </form>
    </dialog>
  </div>
</template>

<style scoped></style>
