<template>
  <v-container>
    <v-card-title class="text-center">{{ getTitle }}</v-card-title>

    <v-form @submit.prevent="submitForm" ref="reportFormRef">
      <v-file-input
        v-model="reportPhoto"
        label="Foto del Reporte"
        accept="image/*"
        show-size
        :rules="photoRules"
      ></v-file-input>

      <v-textarea
        v-model="description"
        label="Descripción"
        :rules="descriptionRules"
      ></v-textarea>

      <div class="mt-5 text-center">
        <v-btn type="submit" color="primary">Registrar</v-btn>
        <v-btn @click="cancelForm" color="error" class="ml-3">Cancelar</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const route = useRouter();
const reportPhoto = ref(null);
const description = ref("");
const reportFormRef = ref(null);
const emit = defineEmits(["register"]);

const photoRules = [
  (value) => {
    if (!reportPhoto.value && !description.value) {
      return !!value || "La foto del reporte es requerida";
    }
    return true;
  },
];

const descriptionRules = [
  (value) => {
    if (!reportPhoto.value && !description.value) {
      return !!value || "La descripción es requerida";
    }
    return true;
  },
  (value) =>
    /^[a-zA-Z0-9\s.,?!ñÑ]+$/.test(value) ||
    "Solo se permiten caracteres alfanuméricos, puntuación y espacios",
];

const reportTypeId = computed(() => {
  return route.currentRoute._value.params.reportType;
});
// Computed property to dynamically set the card title based on the reportType
const getTitle = computed(() => {
  const reportType = Number(reportTypeId.value);
  if (reportType === 1) {
    return "Registro de Acta Impugnación";
  } else if (reportType === 2) {
    return "Registro de Denuncia";
  } else if (reportType === 3) {
    return "Registro de Acta Escrutinio";
  }
  return ""; // Return a default title or handle other cases if needed
});

const cancelForm = () => {
  route.push({ name: "Home" }); // Navigate back to the home page or the "Home" route
};

async function submitForm() {
  const isValid = await reportFormRef.value.validate();

  if (isValid) {
    if (!reportPhoto.value && !description.value) {
      // Both fields are empty, show an error or prevent form submission
      return;
    }
    emit("register", {
      description: description.value,
      image: reportPhoto.value ? reportPhoto.value[0] : null,
      reportTypeId: reportTypeId.value,
    });
    // You can perform further actions like uploading the photo or saving the data
  }
}
</script>
