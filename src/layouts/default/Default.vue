<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="text-center" :style="getTitleStyle">
        {{ title }}
      </v-toolbar-title>
    </v-app-bar>

    <v-container class="mt-15">
      <v-row>
        <slot>
          <router-view />
        </slot>
      </v-row>
    </v-container>
  </v-app>
</template>
<script setup>
import { computed } from "vue";
import { ref, onMounted } from "vue";

// Declare a reactive variable for the title
const title = ref("");

// Function to retrieve centerName from localStorage
const getCenterNameFromLocalStorage = () => {
  const centerName = localStorage.getItem("centerName");
  title.value = centerName || "Centro de Analisis"; // Set the title variable, use a default value if centerName is null or undefined
};

// Call the function on component mount
onMounted(getCenterNameFromLocalStorage);

// Compute the style object for the title based on the screen size
const getTitleStyle = computed(() => {
  if (window.innerWidth <= 600) {
    return {
      fontSize: "0.8rem",
      fontWeight: "bold",
    };
  } else {
    return {
      fontSize: "1.3rem",
      fontWeight: "bold",
    };
  }
});

// Listen for window resize event to update the style
window.addEventListener("resize", () => {
  getTitleStyle.value; // Trigger re-computation of style when the window is resized
});
</script>
<style scoped>
.title-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-app-bar__content {
  padding-left: 0;
  padding-right: 0;
}

.router-link {
  color: inherit;
  text-decoration: none;
  margin: auto !important;
}

.router-link:hover,
.router-link:active {
  color: inherit;
}
</style>
