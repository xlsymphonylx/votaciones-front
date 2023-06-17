<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="text-center" style="font-size: 1.5rem"
        >Centro de Votacion
      </v-toolbar-title>
    </v-app-bar>

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

<style scoped>
.title-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-app-bar__content {
  padding-left: 0;
  padding-right: 0;
}

.router-link {
  color: inherit;
  text-decoration: none;
  margin: auto !important;
}

.router-link:hover,
.router-link:active {
  color: inherit;
}
</style>
