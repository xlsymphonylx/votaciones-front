<template>
  <div class="text-center mt-2" style="margin: auto; width: 100%;">
    <v-btn @click="returnToHome" color="error">Regresar</v-btn>
  </div>
  <div class="img-container mt-5">
    <img :src="imgUrl" alt="" class="img-file" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
const route = useRouter();

const imgUrl = computed(() => {
  return route.currentRoute._value.params.imgUrl;
});

const returnToHome = () => {
  route.push({ name: "Home" }); // Navigate back to the home page or the "Home" route
};
</script>

<style scoped>
.img-container {
  width: 80%;
  max-width: 100%;
  height: 80%;
  margin: 0 auto;
  position: relative;
}

.img-file {
  width: 100%;
  height: auto;
}
</style>
