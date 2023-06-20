<template>
  <v-container fluid>
    <v-row v-if="roleId === 1" justify="center" align="center">
      <v-col cols="12" md="12" lg="auto">
        <menu-card
          link="/reportes/1"
          cardTitle="ACTA IMPUGNACION"
          description="Ingreso de Acta Impugnacion"
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
          link="/userform"
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
    <div
      class="mt-5 container-padding"
      style="padding: 1rem"
      v-if="roleId === 1"
    >
      <v-form @submit.prevent="updateTableName" ref="updateTableFormRef">
        <v-text-field
          v-model="tableName"
          label="Nombre De Mesa"
          type="text"
          :rules="tableNameRules"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary" block>Registar</v-btn>
      </v-form>
    </div>
    <search-filters
      v-if="roleId === 2"
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
import { updateTable } from "../services/authService";
import ListFilters from "@/components/ListFilters.vue";
import SearchFilters from "@/components/SearchFilters.vue";
import ListGrid from "@/components/ListGrid.vue";
import MenuCard from "@/components/MenuCard.vue";

const roleId = ref(null);
const tableName = ref(null);
const updateTableFormRef = ref(null);

const tableNameRules = [
  (v) => !!v || "El nombre es obligatorio",
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
  } catch (error) {
    window.Swal.fire("Error", "Error Interno de Servidor", "error");
  }
};

const getMunicipalities = async () => {
  try {
    const { municipalities: data } = await getAllMunicipalities();
    state.municipalities = data;
  } catch (error) {
    window.Swal.fire("Error", "Error Interno de Servidor", "error");
  }
};

const getVotingCenters = async (municipalityId) => {
  try {
    const { votingCenters: data } = await getAllVotingCenters(municipalityId);
    state.votingCenters = data;
  } catch (error) {
    window.Swal.fire("Error", "Error Interno de Servidor", "error");
  }
};
const updateTableName = async () => {
  const { valid } = await updateTableFormRef.value.validate();
  if (valid) {
    try {
      await updateTable(tableName.value);
      window.Swal.fire({
        icon: "success",
        title: "Exito",
        text: "Registro Exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      window.Swal.fire("Error", "Error Interno de Servidor", "error");
    }
  }
};
onMounted(getRoleIdFromLocalStorage);
onMounted(getMunicipalities);
</script>
