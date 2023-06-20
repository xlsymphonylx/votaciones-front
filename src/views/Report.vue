<template>
  <ReportForm @register="registerReport" />
</template>

<script setup>
import ReportForm from "@/components/ReportForm.vue";
import { register } from "@/services/reportService";
import { useRouter } from "vue-router";
const router = useRouter();

const registerReport = async ({ description, image, reportTypeId }) => {
  try {
    await register(description, image, reportTypeId);
    await window.Swal.fire({
      icon: "success",
      title: "Exito",
      text: "Registro Exitoso",
      showConfirmButton: false,
      timer: 1500,
    });
    router.push({ name: "Home" }); // Navigate back to the home page or the "Home" route
  } catch (error) {
    window.Swal.fire("Error", "Error Interno de Servidor", "error");
  }
};
</script>
