<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <v-select
              v-model="selectedDepartamento"
              :items="departamentos"
              label="Departamento"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="selectedMunicipio"
              :items="municipios"
              label="Municipio"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="selectedMesa"
              :items="mesas"
              label="Mesa"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="selectedTipoDato"
              :items="tiposDato"
              label="Tipo de Dato"
              clearable
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Nombre de Foto</th>
              <th class="text-left">Descripción</th>
              <th class="text-left">Tipo</th>
              <th class="text-left">Mesa</th>
              <th class="text-left">Departamento</th>
              <th class="text-left">Municipio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredData" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.nombreFoto }}</td>
              <td>{{ item.descripcion }}</td>
              <td>{{ item.tipo }}</td>
              <td>{{ item.mesa }}</td>
              <td>{{ item.departamento }}</td>
              <td>{{ item.municipio }}</td>
            </tr>
          </tbody>
        </v-table>
        <p v-if="filteredData.length === 0">Ningún registro encontrado</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";

const selectedDepartamento = ref(null);
const selectedMunicipio = ref(null);
const selectedMesa = ref(null);
const selectedTipoDato = ref(null);

const departamentos = ["Departamento 1", "Departamento 2", "Departamento 3"];
const municipios = ["Municipio 1", "Municipio 2", "Municipio 3"];
const mesas = ["Mesa 1", "Mesa 2", "Mesa 3"];
const tiposDato = ["Tipo 1", "Tipo 2", "Tipo 3"];

const dummyData = [
  {
    id: 1,
    nombreFoto: "Foto 1",
    descripcion: "Descripción 1",
    tipo: "Tipo 1",
    mesa: "Mesa 1",
    departamento: "Departamento 1",
    municipio: "Municipio 1",
  },
  {
    id: 2,
    nombreFoto: "Foto 2",
    descripcion: "Descripción 2",
    tipo: "Tipo 2",
    mesa: "Mesa 2",
    departamento: "Departamento 2",
    municipio: "Municipio 2",
  },
  {
    id: 3,
    nombreFoto: "Foto 3",
    descripcion: "Descripción 3",
    tipo: "Tipo 3",
    mesa: "Mesa 3",
    departamento: "Departamento 3",
    municipio: "Municipio 3",
  },
];

const filteredData = computed(() => {
  return dummyData.filter((item) => {
    if (
      selectedDepartamento.value &&
      item.departamento !== selectedDepartamento.value
    ) {
      return false;
    }
    if (selectedMunicipio.value && item.municipio !== selectedMunicipio.value) {
      return false;
    }
    if (selectedMesa.value && item.mesa !== selectedMesa.value) {
      return false;
    }
    if (selectedTipoDato.value && item.tipo !== selectedTipoDato.value) {
      return false;
    }
    return true;
  });
});
</script>
