<template>
  <v-dialog v-model="dialogVisible" fullscreen hide-overlay>
    <v-card color="#F4F4F4">
      <v-toolbar color="#F4F4F4">
        <div class="text-center" style="width: 100%">
          <v-btn @click="closeDialog" color="red">Cerrar </v-btn>
        </div>
      </v-toolbar>
      <v-card-text>
        <v-img :src="imgUrl" contain class="dialog-image"></v-img>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const dialogVisible = ref(false);
const imgUrl = ref("");

const openDialog = (imageUrl) => {
  imgUrl.value = imageUrl;
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};

defineExpose({ openDialog });
</script>

<style scoped>
.dialog-image {
  width: 100%;
  max-height: calc(100vh - 128px); /* Adjust the value as needed */
}
.mdi-close {
  font-size: 20px;
  color: red;
}
</style>
