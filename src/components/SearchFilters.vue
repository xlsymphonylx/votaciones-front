<template>
    <div class="mt-5">
      <v-row
        justify="center"
        class="button-row"
        :style="{ flexWrap: flexWrapValue }"
      >
        <v-col cols="12" md="auto">
            <div class="text-center">
            <v-select
                class="filter-width filter-height"
                label="Municipio"
                name="municipality"
                :items="municipalities"
                item-title="name"
                item-value="id"
                :class="{ 'fixed-width': !isMobile }"
                variant="solo-filled"
                @update:model-value="municipalityHandler($event.id)"
                return-object
            ></v-select>
            </div>
        </v-col>
        <v-col cols="12" md="auto">
            <div class="text-center">
            <v-select
                class="filter-width filter-height"
                label="Centro de votación"
                :items="pollingPlaces"
                item-title="name"
                item-value="id"
                :class="{ 'fixed-width': !isMobile }"
                v-model="pollingPlaceId"
                variant="solo-filled"
                return-object
            ></v-select>
            </div>
        </v-col>     
        <v-col cols="12" md="auto">
          <div class="text-center">
            <v-btn
                color="primary"
                class="button-width button-height filter-height"
                :class="{ 'fixed-width': !isMobile }"
                @click="searchHandler(pollingPlaceId)"
                :disabled="!pollingPlaceId"
                return-object
            >
               Buscar
            </v-btn>
            </div>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from "vue";
  
  const emit = defineEmits(["municipalityFilter","search"]);
  
  const flexWrapValue = ref("nowrap");
  const pollingPlaceId = ref();

  const municipalities = [
    { id: 1, name: "Morales" },
    { id: 2, name: "El Estor" },
    { id: 3, name: "Livingston" },
    { id: 4, name: "Puerto Barrios" },
    { id: 5, name: "Los Amates" }
  ];

  let pollingPlaces = [
    { id: 1, name: "Morales" },
    { id: 2, name: "El Estor" },
    { id: 3, name: "Livingston" },
    { id: 4, name: "Puerto Barrios" },
    { id: 5, name: "Los Amates" }
  ];

    const municipalityHandler = (id) => {
        console.log(id)
        pollingPlaceId.value = null;
        emit("municipalityFilter", id);
    };
    const searchHandler = (_value) => {
        console.log(_value.id)
        // emit("search", pollingPlaceId);
    };

  
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
  
  .filter-width, .button-width {
    width: 100%;
  }

  .filter-height {
    height: 55px;
  }
  .fixed-width {
    width: 200px; /* Adjust the width as needed */
  }
  </style>
  