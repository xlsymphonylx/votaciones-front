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
            :items="props.roles"
            item-value="id"
            item-title="name"
            :rules="roleIdRules"
            required
          ></v-select>
          <v-autocomplete
            v-model="votingCenterId"
            label="Centro de votación"
            item-value="id"
            item-title="name"
            :items="votingCenters"
            :rules="votingCenterIdRules"
            required
          ></v-autocomplete>
          <div class="text-center mt-2">
            <v-btn type="submit" color="primary" block>Registar</v-btn>
            <v-btn @click="cancelForm" color="error" class="ml-3"
              >Cancelar</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["register"]);
const registerFormRef = ref(null);
const username = ref("");
const firstName = ref("");
const lastName = ref("");
const password = ref("");
const votingCenterId = ref(null);
const roleId = ref(null);
const route = useRouter();

const props = defineProps({
  roles: {
    type: Array,
    default: () => [],
  },
  votingCenters: {
    type: Array,
    default: () => [],
  },
});

const userRules = [
  (v) => !!v || "El nombre de usuario es obligatorio",
  (v) =>
    /^[a-zA-Z0-9]+$/.test(v) || "Solo se permiten caracteres alfanuméricos",
  (v) => v.length <= 20 || "La longitud máxima es de 20 caracteres",
];

const firstNameRules = [
  (v) => !!v || "El nombre es obligatorio",
  (v) => /^[a-zA-Z]+$/.test(v) || "Solo se permiten caracteres alfanuméricos",
  (v) => v.length <= 20 || "La longitud máxima es de 20 caracteres",
];

const lastNameRules = [
  (v) => !!v || "El apellido es obligatorio",
  (v) => /^[a-zA-Z]+$/.test(v) || "Solo se permiten caracteres alfanuméricos",
  (v) => v.length <= 20 || "La longitud máxima es de 20 caracteres",
];

const passwordRules = [
  (v) => !!v || "La contraseña es obligatoria",
  (v) => v.length <= 20 || "La longitud máxima es de 20 caracteres",
];
const votingCenterIdRules = [(v) => !!v || "El centro de votación obligatorio"];
const roleIdRules = [(v) => !!v || "El rol obligatorio"];

const cancelForm = () => {
  route.push({ name: "Home" }); // Navigate back to the home page or the "Home" route
};
async function register() {
  const { valid } = await registerFormRef.value.validate();
  if (valid) {
    // Emit the 'login' event with the username and password values
    emit("register", {
      username: username.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      votingCenterId: votingCenterId.value,
      roleId: roleId.value,
    });
  }
}
</script>

<style>
.user-form {
  max-width: 50rem !important;
}
</style>
