<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <menu-card
          link="/reportes/1"
          cardTitle="ACTA DE IMPUGNACION"
          description="Ingreso de Acta de Impugnacion"
        />
      </v-col>
      <v-col cols="12" md="4">
        <menu-card
          link="/reportes/2"
          cardTitle="DENUNCIA"
          description="Ingreso de Acta de Denuncia"
        />
      </v-col>
      <v-col cols="12" md="4">
        <menu-card
          link="/reportes/3"
          cardTitle="ACTA FINAL DE ESCRUTINIO"
          description="Ingreso de Acta Final de Escrutinio"
        />
      </v-col>
    </v-row>
    <list-filters />
    <list-grid></list-grid>
  </v-container>
</template>

<script setup>
import ListFilters from "@/components/ListFilters.vue";
import ListGrid from "@/components/ListGrid.vue";
import MenuCard from "@/components/MenuCard.vue";
</script>
