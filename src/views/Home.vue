<template>
  <v-container fluid>
    <v-row v-if="roleId === 1">
      <v-col cols="12" md="4">
        <menu-card
          link="/reportes/1"
          cardTitle="ACTA DE IMPUGNACION"
          description="Ingreso de Acta de Impugnacion"
        />
      </v-col>
      <v-col cols="12" md="4">
        <menu-card
          link="/reportes/2"
          cardTitle="DENUNCIA"
          description="Ingreso de Acta de Denuncia"
        />
      </v-col>
      <v-col cols="12" md="4">
        <menu-card
          link="/reportes/3"
          cardTitle="ACTA FINAL DE ESCRUTINIO"
          description="Ingreso de Acta Final de Escrutinio"
        />
      </v-col>
      <v-col cols="12" md="4">
        <menu-card
          cardTitle="Cerrar Sesion"
          description="Cerrar la sesion actual"
          logoutMode
          @click.capture="logout"
        />
      </v-col>
    </v-row>
    <menu-card
      v-else
      cardTitle="Cerrar Sesion"
      description="Cerrar la sesion actual"
      logoutMode
      @click.capture="logout"
    />
    <list-filters @filter="getReports" />
    <list-grid :reports="state.reports"></list-grid>
  </v-container>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { getAll } from "../services/reportService";
import ListFilters from "@/components/ListFilters.vue";
import ListGrid from "@/components/ListGrid.vue";
import MenuCard from "@/components/MenuCard.vue";

const router = useRouter();
const roleId = ref(null);
const state = reactive({
  reports: [],
});
const getRoleIdFromLocalStorage = () => {
  const role = Number.parseInt(localStorage.getItem("roleId"));
  roleId.value = role; // Set the title variable, use a default value if centerName is null or undefined
};

// Call the function on component mount
onMounted(getRoleIdFromLocalStorage);
const logout = () => {
  // Remove data from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("centerName");
  localStorage.removeItem("municipalityName");
  localStorage.removeItem("municipalityVoters");
  localStorage.removeItem("centerVoters");
  localStorage.removeItem("roleId");

  // Redirect to the login page
  location.reload();
};

const getReports = async ({ reportTypeId, votingCenterId }) => {
  try {
    const { reports: data } = await getAll(votingCenterId, reportTypeId);
    console.log(data);
    state.reports = data;
  } catch (error) {}
};
</script>
