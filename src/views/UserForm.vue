<script setup>
import UserForm from "@/components/UserForm.vue";
import { getAllRoles } from "../services/roleService";
import { getAllVotingCenters } from "../services/votingCenterService";
import { useRouter } from "vue-router";
import { reactive, onMounted } from "vue";
import { register } from "@/services/authService";

components: {
  UserForm;
}
const router = useRouter();

const state = reactive({
  roles: [],
  votingCenters: [],
});

const getRoles = async () => {
  try {
    const { roles: data } = await getAllRoles();
    state.roles = data;
  } catch (error) {}
};

const getVotingCenters = async () => {
  try {
    const { votingCenters: data } = await getAllVotingCenters();
    state.votingCenters = data;
  } catch (error) {}
};

const registerUser = async ({
  firstName,
  lastName,
  username,
  password,
  roleId,
  votingCenterId,
}) => {
  try {
    await register(
      firstName,
      lastName,
      username,
      password,
      roleId,
      votingCenterId
    );
    await window.Swal.fire("Exito", "Registro Exitoso", "success");
    router.push({ name: "Home" }); // Navigate back to the home page or the "Home" route
  } catch (error) {
    window.Swal.fire("Error", "Error Interno de Servidor", "error");
    console.error("Login failed", error);
  }
};

onMounted(getRoles);
onMounted(getVotingCenters);
</script>
<template>
  <v-container fluid>
    <user-form
      @register="registerUser"
      :roles="state.roles"
      :voting-centers="state.votingCenters"
      style="margin-top: 2rem"
    />
  </v-container>
</template>

<style scoped>
.main-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
