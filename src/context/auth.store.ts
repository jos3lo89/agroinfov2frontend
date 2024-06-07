import { defineStore } from "pinia";
import { ref, reactive } from "vue";

import { authUserI } from "../types/tipos";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const token = ref(false);
    const datosUsuario = reactive({} as authUserI);
    const roles = ref("");

    return {
      token,
      datosUsuario,
      roles,
    };
  },
  {
    persist: true,
  }
);
