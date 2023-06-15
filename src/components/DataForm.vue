<template>
  <v-container>
    <v-card-title class="text-center">Registro de Datos</v-card-title>

    <v-form @submit.prevent="submitForm" ref="dataFormRef">
      <v-file-input
        v-model="dataPhoto"
        label="Foto del Certificado"
        accept="image/*"
        show-size
        :rules="photoRules"
      ></v-file-input>
      <v-select
        v-model="certificateType"
        :items="certificateTypes"
        label="Tipo de Certificado"
        :rules="certificateTypeRules"
        required
      ></v-select>

      <v-textarea
        v-model="description"
        label="Descripción"
        :rules="descriptionRules"
      ></v-textarea>

      <div class="mt-5 text-center">
        <v-btn type="submit" color="primary">Enviar</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const certificateTypes = ["Papeleta", "Dummy 1", "Dummy 2"]; // Add dummy data here

const certificateType = ref(null);
const dataPhoto = ref(null);
const description = ref("");
const dataFormRef = ref(null);

const certificateTypeRules = [(value) => !!value || "El tipo es requerido"];

const photoRules = [
  (value) => {
    if (!description.value) {
      return !!value || "La foto es requerida";
    }
    return true;
  },
];

const descriptionRules = [
  (value) => {
    if (!dataPhoto.value) {
      return !!value || "La descripción es requerida";
    }
    return true;
  },
  (value) => value.length <= 250 || "La longitud máxima es de 250 caracteres",
  (value) =>
    /^[a-zA-Z0-9\s.,?!]+$/.test(value) ||
    "Solo se permiten caracteres alfanuméricos, puntuación y espacios",
];

async function submitForm() {
  const isValid = await dataFormRef.value.validate();

  if (isValid) {
    if (!dataPhoto.value && !description.value) {
      // Both fields are empty, show an error or prevent form submission
      console.log("Error: Both fields are empty");
      return;
    }

    // Handle form submission
    console.log("Certificate Type:", certificateType.value);
    console.log("Data Photo:", dataPhoto.value);
    console.log("Description:", description.value);
    // You can perform further actions like uploading the photo or saving the data
  }
}
</script>
