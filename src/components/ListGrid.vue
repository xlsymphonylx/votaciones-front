<template>
  <v-container class="list-container">
    <v-row v-if="hasItems">
      <v-col cols="12" md="6" v-for="(item, index) in reports" :key="index">
        <list-item :report="item" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <h3
          class="text-center border border-dark round m-3"
          style="padding: 1rem"
        >
          No hay reportes registrados.
        </h3>
        <!-- Empty message in Spanish -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ListItem from "@/components/ListItem.vue";
import { computed } from "vue";
const props = defineProps({
  reports: {
    type: Array,
    default: () => [],
    required: false,
  },
});

// Computed property to check if items array is empty
const hasItems = computed(() => {
  return props.reports.length > 0;
});
</script>

<style scoped>
.list-container {
  height: 600px; /* Adjust the desired height */
  overflow-y: auto;
}

.list-container::-webkit-scrollbar {
  width: 8px; /* Set the width of the scrollbar */
}

.list-container::-webkit-scrollbar-thumb {
  background-color: #ccc; /* Set the color of the scrollbar thumb */
  border-radius: 4px; /* Set the border radius of the scrollbar thumb */
}

.list-container::-webkit-scrollbar-track {
  background-color: #f4f4f4; /* Set the color of the scrollbar track */
  border-radius: 4px; /* Set the border radius of the scrollbar track */
}
</style>
