<script setup lang="ts">
import { RouterView } from "vue-router";

import MainLayout from "./layout/MainLayout.vue";

import HeaderC from "./components/HeaderC.vue";
</script>

<template>
  <MainLayout>
    <template v-slot:header>
      <HeaderC />
    </template>
    <template v-slot:main>
      <RouterView />
    </template>
    <template v-slot:footer></template>
  </MainLayout>
</template>

<style scoped></style>
