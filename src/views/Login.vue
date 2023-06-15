<script setup>
import LoginForm from "@/components/LoginForm.vue";
components: {
  LoginForm;
}
</script>
<template>
  <div class="main-login">
    <login-form />
  </div>
</template>

<style scoped>
.main-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 50rem;
}
</style>
