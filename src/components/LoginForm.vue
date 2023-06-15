<template>
  <v-container class="login-form">
    <v-card class="login-card">
      <v-card-title class="text-center">Inicio de Sesión</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login" ref="loginFormRef">
          <v-text-field
            id="username"
            v-model="user"
            label="Usuario"
            type="text"
            :rules="userRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>
          <div class="text-center mt-2">
            <v-btn type="submit" color="primary" block>Iniciar Sesión</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
const loginFormRef = ref(null);
const user = ref("");
const password = ref("");
const userRules = [
  (v) => !!v || "El nombre de usuario es obligatorio",
  (v) =>
    /^[a-zA-Z0-9]+$/.test(v) || "Solo se permiten caracteres alfanuméricos",
  (v) => v.length <= 20 || "La longitud máxima es de 20 caracteres",
];
const passwordRules = [
  (v) => !!v || "La contraseña es obligatoria",
  (v) => v.length <= 20 || "La longitud máxima es de 20 caracteres",
];
async function login() {
  const { valid } = await loginFormRef.value.validate();

  if (valid) {
    console.log("Logging in...");
    console.log("User:", user.value);
    console.log("Password:", password.value);

    // Add your login logic here
  }
}
</script>

<style>
.login-form {
  max-width: 50rem !important;
}
</style>
