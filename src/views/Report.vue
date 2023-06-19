<template>
  <ReportForm @register="registerReport" />
</template>

<script setup>
import ReportForm from "@/components/ReportForm.vue";
import { register } from "@/services/reportService";

const registerReport = async ({ description, image, reportTypeId }) => {
  try {
    console.log({ description, image, reportTypeId });
    const { data } = await register(description, image, reportTypeId);
  } catch (error) {
    console.error("Login failed", error);
  }
};
</script>
