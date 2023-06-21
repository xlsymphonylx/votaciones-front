<template>
  <div class="mt-5 mb-5 container-padding">
    <h2 class="text-center mb-2 mt-2">Filtros de Reportes</h2>
    <v-row justify="center" class="search-row">
      <v-col cols="12" md="4">
        <div class="text-center">
          <v-select
            v-model="municipality"
            :items="formattedMunicipalities"
            class="filter-width filter-height"
            label="Municipio"
            name="municipality"
            item-value="id"
            variant="solo-filled"
          ></v-select>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="text-center">
          <v-select
            v-model="reportTypeId"
            :items="reportTypes"
            class="filter-width filter-height"
            label="Tipo de Reporte"
            item-value="id"
            variant="solo-filled"
          ></v-select>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="text-center">
          <v-autocomplete
            v-model="votingCenter"
            :items="formattedVotingCenters"
            class="filter-width filter-height"
            label="Centro de votación"
            item-value="id"
            variant="solo-filled"
          ></v-autocomplete>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn color="primary" @click="searchReports" block>Buscar</v-btn>
      </v-col>
    </v-row>
    <h3 class="text-center">{{ municipalityVoters }}</h3>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from "vue";

const emit = defineEmits(["municipalityFilter", "search"]);
const municipality = ref(null);
const votingCenter = ref(null);
const reportTypeId = ref(null);

const municipalityVoters = computed(() => {
  if (municipality.value) {
    return municipality.value.voters;
  }
});

const props = defineProps({
  municipalities: {
    type: Array,
    default: () => [],
  },
  votingCenters: {
    type: Array,
    default: () => [],
  },
});

const reportTypes = [
  {
    title: "Actas de Impugnación",
    id: 1,
  },
  {
    title: "Denuncias",
    id: 2,
  },
  {
    title: "Actas de Escrutinio",
    id: 3,
  },
];

const searchReports = () => {
  if (votingCenter.value || reportTypeId.value) {
    emit("search", {
      reportTypeId: reportTypeId.value,
      votingCenterId: votingCenter.value,
    });
  }
};
const formattedVotingCenters = computed(() => {
  return props.votingCenters.map((center) => {
    return {
      ...center,
      title: `${center.name} (Empadronados ${center.voters})`,
    };
  });
});

// Computed property to format the municipalities with name and voters
const formattedMunicipalities = computed(() => {
  return props.municipalities.map((municipality) => {
    return {
      ...municipality,
      title: `${municipality.name} (Empadronados ${municipality.voters})`,
    };
  });
});

watchEffect(() => {
  if (municipality.value) {
    emit("municipalityFilter", municipality.value);
  }
});
</script>

<style scoped></style>
