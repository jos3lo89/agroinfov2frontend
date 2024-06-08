<script setup lang="ts">

const props = defineProps({
  abrir: Boolean,   
})

const emits = defineEmits(['close'])

const close = () => {
  emits('close')
}

</script>

<template>
  <dialog :open="props.abrir">
    <p>Esto es un ejemplo de mensaje de diálogo.</p>
    <button @click="close">Cerrar</button>
  </dialog>
</template>

<style scoped></style>
