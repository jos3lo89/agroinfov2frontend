<script setup lang="ts"></script>

<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main class="md:mx-10 mt-4">
    <slot name="main"></slot>
  </main>
  <footer>
    <slot name="footer"> </slot>
  </footer>
</template>

<style scoped></style>
