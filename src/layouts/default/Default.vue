<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <router-link to="/" class="router-link">
        <v-toolbar-title class="text-md-left pl-0">Votaciones</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item>
          <v-list-item-content class="align-center">
            <v-row align="center">
              <v-col cols="auto">
                <v-list-item-icon>
                  <v-icon>mdi-database</v-icon>
                </v-list-item-icon>
              </v-col>
              <v-col>
                <router-link to="/datos" class="router-link">
                  <v-list-item-title class="ml-2">Datos</v-list-item-title>
                </router-link>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content class="align-center">
            <v-row align="center">
              <v-col cols="auto">
                <v-list-item-icon>
                  <v-icon>mdi-alert</v-icon>
                </v-list-item-icon>
              </v-col>
              <v-col>
                <router-link to="/denuncias" class="router-link">
                  <v-list-item-title class="ml-2">Denuncias</v-list-item-title>
                </router-link>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-content class="align-center">
            <v-row align="center">
              <v-col cols="auto">
                <v-list-item-icon>
                  <v-icon color="error">mdi-logout</v-icon>
                </v-list-item-icon>
              </v-col>
              <v-col>
                <v-list-item-title class="ml-2 text-error" 
                  >Cerrar Sesión</v-list-item-title
                >
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container class="mt-15">
        <v-row>
          <slot>
            <router-view />
          </slot>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const drawer = ref(false);
const router = useRouter();

function toggleDrawer() {
  drawer.value = !drawer.value;
}

function logout() {
  // Handle logout action
  console.log("Logout clicked");
}
</script>

<style scoped>
.v-app-bar__content {
  padding-left: 0;
  padding-right: 0;
}

.v-toolbar__title {
  margin-left: 0.5rem;
}

.router-link {
  color: inherit;
  text-decoration: none;
}

.router-link:hover,
.router-link:active {
  color: inherit;
}
</style>
