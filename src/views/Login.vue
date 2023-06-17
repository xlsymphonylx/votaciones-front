<script setup>
import LoginForm from "@/components/LoginForm.vue";
components: {
  LoginForm;
}
</script>
<template>
  <v-app class="main-login">
    <v-app-bar app>
      <v-toolbar-title class="text-center" style="font-size: 1.5rem; font-weight: bold;">SISFIVOT</v-toolbar-title>
    </v-app-bar>
    <login-form @login="" style="margin-top: 14rem" />
  </v-app>
</template>

<style scoped>
.main-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 50rem;
}
</style>
