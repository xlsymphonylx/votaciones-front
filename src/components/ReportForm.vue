<template>
  <v-container>
    <v-card-title class="text-center">Registro de Denuncia</v-card-title>

    <v-form @submit.prevent="submitForm" ref="reportFormRef">
      <v-file-input
        v-model="reportPhoto"
        label="Foto del Reporte"
        accept="image/*"
        show-size
        :rules="photoRules"
        required
      ></v-file-input>

      <v-textarea
        v-model="description"
        label="Descripción"
        :rules="descriptionRules"
        required
      ></v-textarea>

      <v-select
        v-model="selectedDepartment"
        :items="departments"
        label="Departamento"
        :rules="departmentRules"
        required
      ></v-select>

      <v-select
        v-model="selectedMunicipality"
        :items="municipalities"
        label="Municipio"
        :rules="municipalityRules"
        required
      ></v-select>

      <v-select
        v-model="selectedMesa"
        :items="mesas"
        label="Mesa"
        :rules="mesaRules"
        required
      ></v-select>

      <v-text-field
        v-model="selectedDatetime"
        label="Fecha y Hora"
        type="datetime-local"
        :rules="datetimeRules"
        required
      ></v-text-field>

      <div class="mt-5 text-center">
        <v-btn type="submit" color="primary">Enviar</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const reportPhoto = ref(null);
const description = ref("");
const selectedDepartment = ref(null);
const selectedMunicipality = ref(null);
const selectedMesa = ref(null);
const selectedDatetime = ref(null);
const reportFormRef = ref(null);

// Dummy data for the selects
const departments = ["Department 1", "Department 2", "Department 3"];
const municipalities = ["Municipality 1", "Municipality 2", "Municipality 3"];
const mesas = ["Mesa 1", "Mesa 2", "Mesa 3"];

const photoRules = [(value) => !!value || "La foto del reporte es requerida"];

const descriptionRules = [
  (value) => !!value || "La descripción es requerida",
  (value) => value.length <= 250 || "La longitud máxima es de 250 caracteres",
  (value) =>
    /^[a-zA-Z0-9\s.,?!]+$/.test(value) ||
    "Solo se permiten caracteres alfanuméricos, puntuación y espacios",
];

const departmentRules = [(value) => !!value || "El departamento es requerido"];

const municipalityRules = [(value) => !!value || "El municipio es requerido"];

const mesaRules = [(value) => !!value || "La mesa es requerida"];

const datetimeRules = [(value) => !!value || "La fecha y hora son requeridas"];

async function submitForm() {
  const isValid = await reportFormRef.value.validate();

  if (isValid) {
    // Handle form submission
    console.log("Report Photo:", reportPhoto.value);
    console.log("Description:", description.value);
    console.log("Department:", selectedDepartment.value);
    console.log("Municipality:", selectedMunicipality.value);
    console.log("Mesa:", selectedMesa.value);
    console.log("Datetime:", selectedDatetime.value);
    // You can perform further actions like uploading the photo or saving the data
  }
}
</script>
