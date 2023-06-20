<template>
    <v-container class="login-form">
      <v-card class="login-card">
        <v-card-title class="text-center">Registro de usuario</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="register" ref="registerFormRef">
            <v-text-field
              id="firstName"
              v-model="firstName"
              label="Primer Nombre"
              type="text"
              :rules="firstNameRules"
              required
            ></v-text-field>
            <v-text-field
              id="lastName"
              v-model="lastName"
              label="Primer Apellido"
              type="text"
              :rules="lastNameRules"
              required
            ></v-text-field>
            <v-text-field
              id="username"
              v-model="username"
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
            <v-select
              v-model="roleId"
              label="Rol"
              :items="roles"
              type="password"
              required
            ></v-select>
            <v-select
              v-model="votingCenterId"
              label="Centro de votación"
              :items="votingCenters"
              type="password"
              required
            ></v-select>
            <div class="text-center mt-2">
              <v-btn type="submit" color="primary" block>Registar</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  const emit = defineEmits(["register"]);
  const registerFormRef = ref(null);
  const username    = ref("");
  const firstName   = ref("");
  const lastName    = ref("");
  const password    = ref("");

  const userRules = [
    (v) => !!v || "El nombre de usuario es obligatorio",
    (v) =>
      /^[a-zA-Z0-9]+$/.test(v) || "Solo se permiten caracteres alfanuméricos",
    (v) => v.length <= 20 || "La longitud máxima es de 20 caracteres",
  ];

  const firstNameRules = [
    (v) => !!v || "El nombre es obligatorio",
    (v) =>
      /^[a-zA-Z]+$/.test(v) || "Solo se permiten caracteres alfanuméricos",
    (v) => v.length <= 20 || "La longitud máxima es de 20 caracteres",
  ];

  const lastNameRules = [
    (v) => !!v || "El apellido es obligatorio",
    (v) =>
      /^[a-zA-Z]+$/.test(v) || "Solo se permiten caracteres alfanuméricos",
    (v) => v.length <= 20 || "La longitud máxima es de 20 caracteres",
  ];

  const passwordRules = [
    (v) => !!v || "La contraseña es obligatoria",
    (v) => v.length <= 20 || "La longitud máxima es de 20 caracteres",
  ];
//   async function login() {
//     const { valid } = await loginFormRef.value.validate();
//     if (valid) {
//       // Emit the 'login' event with the username and password values
//       emit("login", { username: username.value, password: password.value });
//     }
//   }
  </script>
  
  <style>
  .user-form {
    max-width: 50rem !important;
  }
  </style>
  