<template>
  <v-container fluid>
    <v-row
    justify="space-around">
      <v-col cols="12" md="12" lg="auto">
        <menu-card
          link="/reportes/1"
          cardTitle="ACTA DE IMPUGNACION"
          description="Ingreso de Acta de Impugnacion"
        />
      </v-col>
      <v-col cols="12" md="12" lg="auto">
        <menu-card
          link="/reportes/2"
          cardTitle="DENUNCIA"
          description="Ingreso de Acta de Denuncia"
        />
      </v-col>
      <v-col cols="12" md="12" lg="auto">
        <menu-card
          link="/reportes/3"
          cardTitle="ACTA DE ESCRUTINIO"
          description="Ingreso de Acta de Escrutinio"
        />
      </v-col>
    </v-row>
    <search-filters></search-filters>
    <list-filters />
    <list-grid></list-grid>
  </v-container>
</template>

<script setup>
import ListFilters from "@/components/ListFilters.vue";
import ListGrid from "@/components/ListGrid.vue";
import MenuCard from "@/components/MenuCard.vue";
import SearchFilters from "@/components/SearchFilters.vue";
</script>
