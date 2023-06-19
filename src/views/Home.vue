<template>
  <v-container fluid>
    <v-row v-if="roleId === 1" justify="center" align="center">
      <v-col cols="12" md="12" lg="auto">
        <menu-card
          link="/reportes/1"
          cardTitle="ACTA DE IMPUGNACION"
          description="Ingreso de Acta de Impugnacion"
        />
      </v-col>
      <v-col cols="12" md="12" lg="auto">
        <menu-card
          link="/reportes/2"
          cardTitle="DENUNCIA"
          description="Ingreso de Acta de Denuncia"
        />
      </v-col>
      <v-col cols="12" md="12" lg="auto">
        <menu-card
          link="/reportes/3"
          cardTitle="ACTA DE ESCRUTINIO"
          description="Ingreso de Acta de Escrutinio"
        />
      </v-col>

      <v-col cols="12" md="12" lg="auto">
        <menu-card
          cardTitle="Cerrar Sesion"
          description="Cerrar la sesion actual"
          logoutMode
          @click.capture="logout"
        />
      </v-col>
    </v-row>
    <v-row v-else justify="center" align="center">
      <v-col cols="12" md="6" lg="6">
        <menu-card
          link="/reportes/3"
          cardTitle="AGREGAR USUARIO"
          description="Ingreso de Usuario"
          userMode
        />
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <menu-card
          cardTitle="Cerrar Sesion"
          description="Cerrar la sesion actual"
          logoutMode
          @click.capture="logout"
        />
      </v-col>
    </v-row>
    <search-filters
      :municipalities="state.municipalities"
      :votingCenters="state.votingCenters"
      @municipalityFilter="getVotingCenters"
      @search="getReports"
    ></search-filters>
    <list-filters @filter="getReports" />
    <list-grid :reports="state.reports"></list-grid>
  </v-container>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { getAll } from "../services/reportService";
import { getAllMunicipalities } from "../services/municipalityService";
import { getAllVotingCenters } from "../services/votingCenterService";
import ListFilters from "@/components/ListFilters.vue";
import SearchFilters from "@/components/SearchFilters.vue";
import ListGrid from "@/components/ListGrid.vue";
import MenuCard from "@/components/MenuCard.vue";

const roleId = ref(null);
const tableName = ref(null);
const tableNameRules = [
  (v) =>
    /^[a-zA-Z0-9]+$/.test(v) || "Solo se permiten caracteres alfanuméricos",
  (v) => v.length <= 20 || "La longitud máxima es de 20 caracteres",
];
const state = reactive({
  reports: [],
  municipalities: [],
  votingCenters: [],
});
const getRoleIdFromLocalStorage = () => {
  const role = Number.parseInt(localStorage.getItem("roleId"));
  roleId.value = role; // Set the title variable, use a default value if centerName is null or undefined
};

// Call the function on component mount
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
    state.reports = data;
  } catch (error) {}
};

const getMunicipalities = async () => {
  try {
    const { municipalities: data } = await getAllMunicipalities();
    state.municipalities = data;
  } catch (error) {}
};

const getVotingCenters = async (municipalityId) => {
  try {
    const { votingCenters: data } = await getAllVotingCenters(municipalityId);
    state.votingCenters = data;
  } catch (error) {}
};

onMounted(getRoleIdFromLocalStorage);
onMounted(getMunicipalities);
</script>
