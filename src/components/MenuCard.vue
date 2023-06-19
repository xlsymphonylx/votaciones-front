<template>
  <v-card class="horizontal-card" outlined @click="navigateToLink">
    <v-row align="center" no-gutters>
      <v-col cols="auto" class="ml-3">
        <span class="mdi mdi-camera" v-if="!logoutMode"></span>
        <span class="mdi mdi-logout" v-else></span>
      </v-col>
      <v-col>
        <v-card-text v-if="!logoutMode">
          <h3 class="headline">{{ cardTitle }}</h3>
          <p class="body-1">{{ description }}</p>
        </v-card-text>
        <v-card-text v-else>
          <h3 class="headline text--red">{{ cardTitle }}</h3>
          <p class="body-1 text--red">{{ description }}</p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  cardTitle: {
    type: String,
    required: true,
    default: "Card Title",
  },
  description: {
    type: String,
    required: true,
    default: "Card Description",
  },
  link: {
    type: String,
    default: "/",
  },
  logoutMode: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

function navigateToLink() {
  router.push(props.link);
}
</script>

<style scoped>
.horizontal-card {
  min-width: 300px;
  margin: 16px;
}

.mdi-camera,.mdi-logout  {
  font-size: 48px;
}

</style>
