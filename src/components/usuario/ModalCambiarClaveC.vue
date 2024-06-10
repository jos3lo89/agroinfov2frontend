<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import { cambiarClavesF } from "../../service/auth.service";

const props = defineProps({
  abrir: Boolean,
});

const emits = defineEmits(["close"]);

const close = () => {
  emits("close");
};

const passwordOk = ref({
  pass1: false,
  pass2: false,
});

interface clavesI {
  password: string;
  confirmPassword: string;
  password2: string;
  confirmPassword2: string;
  confirmPasswordError: string;
  confirmPasswordError2: string;
}

const claves = reactive<clavesI>({
  password: "",
  confirmPassword: "",
  password2: "",
  confirmPassword2: "",
  confirmPasswordError: "",
  confirmPasswordError2: "",
});

watch(
  [() => claves.password, () => claves.confirmPassword],
  ([newPassword, newConfirmPassword]) => {
    if (newPassword !== newConfirmPassword && newConfirmPassword != "") {
      claves.confirmPasswordError = "no coincide";
    } else {
      claves.confirmPasswordError = "";
      passwordOk.value.pass1 = true;
    }
  }
);

watch(
  [() => claves.password2, () => claves.confirmPassword2],
  ([newPassword2, newConfirmPassword2]) => {
    if (newPassword2 !== newConfirmPassword2 && newConfirmPassword2 != "") {
      claves.confirmPasswordError2 = "no coincide";
    } else {
      claves.confirmPasswordError2 = "";
      passwordOk.value.pass2 = true;
    }
  }
);

const cambiarClaves = async () => {
  if (passwordOk.value.pass1 && passwordOk.value.pass2) {
    const claves2 = {
      clave: claves.password,
      nuevaClave: claves.password2,
    };

    try {
      const res = await cambiarClavesF(claves2);
      console.log(res);

      if (res.status == 200) {
        toast.success("Contraseña cambiada", {
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
  }
};
</script>

<template>
  <div
    v-if="props.abrir"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div @click="close" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>

    <dialog
      :open="props.abrir"
      class="z-60 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg relative"
    >
      <button
        @click="close"
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
        <strong class="text-xl font-semibold">Cambiar contraseña</strong>
      </div>

      <form
        @submit.prevent="cambiarClaves"
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="md:mb-5">
            <label
              for="password2"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Su nueva contraseña</label
            >
            <input
              v-model="claves.password2"
              type="password"
              id="password2"
              placeholder="********"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div class="md:mb-5">
            <label
              for="confirm_password2"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >confirma su nueva contraseña</label
            >
            <input
              v-model="claves.confirmPassword2"
              type="password"
              id="confirm_password2"
              placeholder="********"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <span
              :class="{
                'text-red-500': claves.confirmPasswordError2,
                hidden: claves.confirmPasswordError2 == '',
              }"
            >
              {{ claves.confirmPasswordError2 }}
            </span>
          </div>
        </div>

        <button
          type="submit"
          class="bg-transparent border  hover:text-white hover:border-red-600  hover:bg-red-600 mt-2   font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-transparent dark:hover:bg-red-800 "
        >
          cambiar contraseña
        </button>
      </form>
    </dialog>
  </div>
</template>

<style scoped></style>
