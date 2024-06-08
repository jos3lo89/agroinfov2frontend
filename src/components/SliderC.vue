<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const modulos = [Navigation, Autoplay, Pagination];

const datos = [
  {
    img: "foto1.webp",
    txt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore excepturi in, at placeat rerum architecto?",
  },
  {
    img: "foto1.webp",
    txt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore excepturi in, at placeat rerum architecto?",
  },
];
</script>

<template>
  <div class="my-3 rounded-lg shadow">
    <Swiper
      :modules="modulos"
      :navigation="true"
      :pagination="{ clickable: true }"
      :loop="true"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
    >
      <SwiperSlide v-for="(dato, i) in datos" :key="i">
        <img
          :src="dato.img"
          alt="Photo description"
          class="absolute top-0 bottom-0 right-0 left-0 w-full h-full object-cover -z-10 rounded-lg"
        />
        <p class="text-white">{{ dato.txt }}</p>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.swiper {
  /* @apply bg-yellow-600 w-full overflow-hidden; */
  overflow: hidden;
  width: 100%;
  height: 340px;
}

.swiper-slide {
  /* @apply flex items-center justify-center flex-col p-10 shadow-md; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2.5rem;
}

@media (max-width: 768px) {
  .swiper {
    height: 226px;
  }
}
</style>
