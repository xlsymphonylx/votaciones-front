<template>
  <v-container class="list-container">
    <v-row>
      <v-col cols="12" md="6" v-for="(item, index) in items" :key="index">
        <list-item :report="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ListItem from "@/components/ListItem.vue";

const items = [
  // Example data objects
  {
    id: 1,
    description: "Example 1",
    userName: "User 1",
    tableName: "Table 1",
    createdAt: "2022-01-01",
    link: "example.com/img1.jpg",
  },
  {
    id: 2,
    description: "Example 2",
    userName: "User 2",
    tableName: "Table 2",
    createdAt: "2022-02-02",
    link: "example.com/img2.jpg",
  },
  {
    id: 3,
    description: "Example 3",
    userName: "User 3",
    tableName: "Table 3",
    createdAt: "2022-03-03",
    link: "example.com/img3.jpg",
  },
  {
    id: 4,
    description: "Example 4",
    userName: "User 4",
    tableName: "Table 4",
    createdAt: "2022-04-04",
    link: "example.com/img4.jpg",
  },
  {
    id: 5,
    description: "Example 5",
    userName: "User 5",
    tableName: "Table 5",
    createdAt: "2022-05-05",
    link: "example.com/img5.jpg",
  },
];
</script>

<style scoped>
.list-container {
  height: 600px; /* Adjust the desired height */
  overflow-y: auto;
}

.list-container::-webkit-scrollbar {
  width: 8px; /* Set the width of the scrollbar */
}

.list-container::-webkit-scrollbar-thumb {
  background-color: #ccc; /* Set the color of the scrollbar thumb */
  border-radius: 4px; /* Set the border radius of the scrollbar thumb */
}

.list-container::-webkit-scrollbar-track {
  background-color: #f4f4f4; /* Set the color of the scrollbar track */
  border-radius: 4px; /* Set the border radius of the scrollbar track */
}
</style>
