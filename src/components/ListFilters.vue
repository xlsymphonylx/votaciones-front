<template>
  <div class="mt-5">
    <h2 class="title">Visualizar Registros</h2>
    <v-row
      justify="center"
      class="button-row"
      :style="{ flexWrap: flexWrapValue }"
    >
      <v-col cols="12" lg="auto" md="auto" sm="auto" class="button-column" v-for="button in buttons" :key="button.id">
        <div class="text-center">
          <v-btn
            color="primary"
            class="button-width"
            :class="{ 'fixed-width': !isMobile }"
            @click="filterHandler(button.id)"
          >
            {{ button.label }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const emit = defineEmits(["filter"]);


const flexWrapValue = ref("nowrap");
const buttons = [
  { id: 1, label: "Actas Impugnación" },
  { id: 2, label: "Denuncias" },
  { id: 3, label: "Actas Escrutinio" },
];

const isMobile = ref(false);

watchEffect(() => {
  const handleResize = () => {
    isMobile.value = window.innerWidth <= 768;
    flexWrapValue.value = isMobile.value ? "wrap" : "nowrap";
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  // Cleanup the event listener on component unmount
  return () => {
    window.removeEventListener("resize", handleResize);
  };
});

const filterHandler = (id) => {
  emit("filter", id);
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 16px;
}

.button-row {
  justify-content: space-around !important;
  margin: 0 auto;
  max-width: 600px;
}

.button-width {
  width: 100%;
  min-width: 200px;
}

.fixed-width {
  width: 200px; /* Adjust the width as needed */
}

@media only screen and (max-width: 770px) {
  .button-column {
    width: 100%;
  }
}
</style>
