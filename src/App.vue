<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";

import MainLayout from "./layout/MainLayout.vue";
import HeaderC from "./components/HeaderC.vue";
import FooterC from "./components/FooterC.vue";
import { computed } from "vue";

const rutasFooter = ["inicio"];

const route = useRoute();

const verFooter = computed(() => rutasFooter.includes(route.name as string));
</script>

<template>
  <MainLayout>
    <template v-slot:header>
      <HeaderC />
    </template>
    <template v-slot:main>
      <RouterView />
    </template>
    <template v-slot:footer>
      <FooterC v-if="verFooter" />
    </template>
  </MainLayout>
</template>

<style scoped></style>
