<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Votaciones </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text to="/datos">Datos</v-btn>
      <v-btn text to="/denuncias">Denuncias</v-btn>
      <v-btn color="error" text>Cerrar Sesión</v-btn>
    </v-app-bar>

    <div class="content">
      <v-container>
        <v-row>
          <slot>
            <router-view />
          </slot>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script setup></script>

<style scoped>
.content {
  margin-top: 5rem;
}
</style>
