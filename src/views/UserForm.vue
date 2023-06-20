<script setup>
import UserForm from "@/components/UserForm.vue";
import { login } from "../services/authService";
import { getAllRoles } from "../services/roleService";
import { getAllVotingCenters } from "../services/votingCenterService";
import { useRouter } from "vue-router";
import { provide } from "vue";

components: {
  UserForm;
}
const router = useRouter();
const roles = getAllRoles();
const votingCenters = getAllVotingCenters();



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

provide("roles", roles);
provide("votingCenters", votingCenters);
</script>
<template>
  <v-container fluid>
    <user-form @register="registerUser" style="margin-top: 14rem" />
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
