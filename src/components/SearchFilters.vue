<template>
  <div class="mt-5 container-padding">
    <v-row justify="center" class="search-row">
      <v-col cols="12" md="4" class="search-column">
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
      <v-col cols="12" md="4" class="search-column">
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
      <v-col cols="12" md="4" class="search-column">
        <v-btn color="primary" class="button-width" @click="searchReports"
          >Buscar</v-btn
        >
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
  reportTypeId: {
    type: Number,
    default: null,
  },
});

const searchReports = () => {
  if (votingCenter.value) {
    emit("search", {
      reportTypeId: null,
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

<style scoped>
.button-width {
  width: 100% !important;
  height: 72%;
}
.container-padding {
  padding: 1rem;
}
@media (max-width: 599px) {
  .search-row {
    flex-direction: column;
  }

  .search-column {
    margin-bottom: 10px;
  }

  .button-width {
    width: 100%;
    min-width: 200px;
    padding: 1rem;
  }
}
</style>
