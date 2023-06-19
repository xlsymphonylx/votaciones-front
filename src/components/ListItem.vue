<template>
  <v-card class="custom-card" outlined>
    <div class="custom-card-header text-center">
      <h3 class="custom-card-title">{{ report.ReportType.name }}</h3>
    </div>
    <v-container fluid>
      <v-row v-if="isMobile">
        <v-col cols="12">
          <h4 class="custom-subtitle">Numero</h4>
          <div class="custom-content">{{ report.id }}</div>
        </v-col>
        <v-col cols="12">
          <h4 class="custom-subtitle">Descripcion</h4>
          <div class="custom-content">{{ report.description }}</div>
        </v-col>
        <v-col cols="12">
          <h4 class="custom-subtitle">Usuario</h4>
          <div class="custom-content">
            {{ `${report.User.firstName} ${report.User.lastName}` }}
          </div>
        </v-col>
        <v-col cols="12">
          <h4 class="custom-subtitle">Mesa</h4>
          <div class="custom-content">{{ report.tableName || "" }}</div>
        </v-col>
        <v-col cols="12">
          <h4 class="custom-subtitle">Fecha</h4>
          <div class="custom-content">{{ report.createdAt }}</div>
        </v-col>
        <v-col cols="12">
          <h4 class="custom-subtitle">Ver</h4>
          <div class="custom-content">
            <a :href="report.link" target="_blank"
              ><span class="mdi mdi-eye mdi-24px"></span
            ></a>
          </div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="4">
          <h4 class="custom-subtitle">Numero</h4>
          <div class="custom-content">{{ report.id }}</div>
        </v-col>
        <v-col cols="4">
          <h4 class="custom-subtitle">Descripcion</h4>
          <div class="custom-content">{{ report.description }}</div>
        </v-col>
        <v-col cols="4">
          <h4 class="custom-subtitle">Usuario</h4>
          <div class="custom-content">
            {{ `${report.User.firstName} ${report.User.lastName}` }}
          </div>
        </v-col>
        <v-col cols="4">
          <h4 class="custom-subtitle">Mesa</h4>
          <div class="custom-content">
            {{ report.tableName || "No asignado" }}
          </div>
        </v-col>
        <v-col cols="4">
          <h4 class="custom-subtitle">Fecha</h4>
          <div class="custom-content">
            {{ formatDateTime(report.createdAt) }}
          </div>
        </v-col>
        <v-col cols="4">
          <h4 class="custom-subtitle">Ver</h4>
          <div class="custom-content">
            <a :href="report.link" target="_blank"
              ><span class="mdi mdi-eye mdi-26px"></span
            ></a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

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
const formatDateTime = (datetime) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDateTime = new Date(datetime).toLocaleString("es-ES", options);
  return formattedDateTime;
};
const cardTitle = props.report.typeName;
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
  color: black;
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
