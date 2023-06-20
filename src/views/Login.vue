<script setup>
import LoginForm from "@/components/LoginForm.vue";
import { login } from "../services/authService";
import { useRouter } from "vue-router";
components: {
  LoginForm;
}
const router = useRouter();
const loginUser = async ({ username, password }) => {
  try {
    const {
      token,
      centerName,
      municipalityName,
      municipalityVoters,
      centerVoters,
      roleId,
    } = await login(username, password);
    localStorage.setItem("token", token);
    localStorage.setItem("roleId", roleId);
    if (roleId === 1) {
      localStorage.setItem("centerName", centerName);
      localStorage.setItem("municipalityName", municipalityName);
      localStorage.setItem("municipalityVoters", municipalityVoters);
      localStorage.setItem("centerVoters", centerVoters);
    }
    await window.Swal.fire({
      icon: "success",
      title: "Exito",
      text: "Registro Exitoso",
      showConfirmButton: false,
      timer: 1500,
    });
    router.push("/");
  } catch (error) {
    window.Swal.fire("Error", "Error Interno de Servidor", "error");
    console.error("Login failed", error);
  }
};
</script>
<template>
  <v-app class="main-login">
    <v-app-bar app>
      <v-toolbar-title
        class="text-center"
        style="font-size: 1.5rem; font-weight: bold"
        >SISFIVOT</v-toolbar-title
      >
    </v-app-bar>
    <login-form @login="loginUser" style="margin-top: 14rem" />
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
