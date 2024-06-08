import { createApp } from "vue";
import "./style.css";
import "vue3-toastify/dist/index.css";
import App from "./App.vue";
import router from "./routes/routes";
import { VueCookieNext } from "vue-cookie-next";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersist);

app.use(VueCookieNext);
app.use(pinia);
app.use(router);
app.mount("#app");

VueCookieNext.config({ expire: "1d" });

// guardian de rutas

import { useAuthStore } from "./context/auth.store";

const authStore = useAuthStore();

// const roles = authStore.roles;
// console.log(roles);

router.beforeEach((to, _from, next) => {
  const isAuthenticated = to.meta.requireAuth;
  const token = VueCookieNext.getCookie("token");
  const roles = authStore.roles;
  const requireRoles = to.meta.requireRoles as string[];

//   console.log("Ruta destino:", to.name);
//   console.log("Roles requeridos:", requireRoles);
//   console.log("Roles del usuario:", roles);

  // true && true
  if (isAuthenticated && token) {
    if (requireRoles.includes(roles)) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    // console.log("No hay token");
    if (isAuthenticated) {
      next({ name: "inicio" });
    }
    next();
  }
});
