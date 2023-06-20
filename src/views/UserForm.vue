<script setup>
import UserForm from "@/components/UserForm.vue";
import { login } from "../services/authService";
import { getAllRoles } from "../services/roleService";
import { getAllVotingCenters } from "../services/votingCenterService";
import { useRouter } from "vue-router";
import { reactive, onMounted } from "vue";

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
    console.log("=====", state.roles)
  } catch (error) {}
};

const getVotingCenters = async (municipalityId) => {
  try {
    const { votingCenters: data } = await getAllVotingCenters(municipalityId);
    state.votingCenters = data;
  } catch (error) {}
};


const registerUser = async ({ firstName, lastName, username, password, roleId, centerVoters }) => {
  try {
    const {
      token
    } = await registerUser(firstName, lastName, username, password, roleId, centerVoters);
    localStorage.setItem("token", token);
    localStorage.setItem("roleId", roleId);
    router.push("/");
  } catch (error) {
    console.error("Login failed", error);
  }
};

onMounted(getRoles);
</script>
<template>
  <v-container fluid>
    <user-form @register="registerUser" :roles="state.roles" style="margin-top: 14rem" />
  </v-container>
</template>

<style scoped>
.main-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 50rem;
}
</style>
