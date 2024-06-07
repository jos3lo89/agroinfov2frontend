import { createRouter, createWebHistory } from "vue-router";

import InicioView from "../views/InicioView.vue";
import LoginView from "../views/LoginView.vue";
import RegistrarView from "../views/RegistrarView.vue";
import AdminView from "../views/admin/AdminView.vue";
import AdminAsocView from "../views/admin/AdminAsocView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "inicio",
      component: InicioView,
      meta: {
        requireAuth: false,
        requireRoles: ["admin_asociaciones", "publico", "admin_general", "visitante"],
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        requireAuth: false,
        requireRoles: ["admin_asociaciones", "publico", "admin_general" , "visitante"],
      },
    },
    {
      path: "/registrar",
      name: "registrar",
      component: RegistrarView,
      meta: {
        requireAuth: false,
        requireRoles: ["admin_asociaciones", "publico", "admin_general", "visitante"],
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
      meta: {
        requireAuth: true,
        requireRoles: ["admin_general"],
      },
    },
    {
        path: "/admin_asociaciones",
        name: "admin_asociaciones",
        component: AdminAsocView,
        meta: {
          requireAuth: true,
          requireRoles: ["admin_asociaciones"],
        },
    }
  ],
});

export default router;
