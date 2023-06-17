<template>
  <v-card class="custom-card" outlined>
    <div class="custom-card-header text-center">
      <h3 class="custom-card-title">{{ cardTitle }}</h3>
    </div>
    <v-container fluid>
      <v-row v-if="isMobile">
        <v-col cols="12" v-for="(item, index) in mobileItems" :key="index">
          <h4 class="custom-subtitle">{{ item.title }}</h4>
          <div class="custom-content" v-html="item.content"></div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="4" v-for="(item, index) in desktopItems" :key="index">
          <h4 class="custom-subtitle">{{ item.title }}</h4>
          <div class="custom-content" v-html="item.content"></div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps } from "vue";

const props = defineProps({
  report: {
    type: Object,
    required: false,
    default: () => ({
      id: 12,
      description: "example",
      userName: "Admin",
      tableName: "Mesa 1",
      typeName: "Acta Impugnación",
      createdAt: "2013-12-12",
      link: "examplecdn.com/img=234323a.jpg",
    }),
  },
  
});

const isMobile = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const mobileItems = [
  { title: "Numero", content: props.report.id },
  { title: "Descripcion", content: props.report.description },
  { title: "Usuario", content: props.report.userName },
  { title: "Mesa", content: props.report.tableName },
  { title: "Fecha", content: props.report.createdAt },
  {
    title: "Ver",
    content: `<a href="${props.report.link}" target="_blank"><span class="mdi mdi-eye mdi-24px"></span></a>`,
  },
];

const desktopItems = [
  { title: "Numero", content: props.report.id },
  { title: "Descripcion", content: props.report.description },
  { title: "Usuario", content: props.report.userName },
  { title: "Mesa", content: props.report.tableName },
  { title: "Fecha", content: props.report.createdAt },
  {
    title: "Ver",
    content: `<a href="${props.report.link}" target="_blank"><span class="mdi mdi-eye mdi-36px"></span></a>`,
  },
];

const cardTitle = props.report.typeName
</script>

<style scoped>
.custom-card {
  background-color: white;
  border-color: #c7d8e2;
}

.custom-card-header {
  background-color: #f0f5f9;
  padding: 16px;
}

.custom-card-title {
  color: #428bca;
  margin: 0;
}

.custom-subtitle {
  margin-top: 8px;
  font-weight: bold;
  text-align: center;
}

.custom-content {
  margin-bottom: 0;
  text-align: center;
}

.custom-content .mdi-eye {
  font-size: 48px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .custom-card {
    margin: 16px;
  }

  .custom-subtitle,
  .custom-content {
    text-align: center;
  }
}

@media (min-width: 769px) {
  .custom-card {
    margin: 0 16px;
  }

  .custom-card-header {
    text-align: center;
  }

  .custom-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
