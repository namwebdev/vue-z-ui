<template>
  <div class="w-96">
    <Table :columns="columns" :data="tableData" />
  </div>
</template>

<script setup lang="ts">
import Table from "./src/Index.vue";
import { ref } from "vue";

const columns = ref([
  {
    prop: "id",
    label: "ID",
  },
  {
    prop: "name",
    label: "Name",
    sortable: true,
  },
  {
    prop: "date",
    label: "Date",
    sortable: true,
  },
]);
const tableData = ref([
  {
    id: 1,
    name: "Test",
    date: "2020/20/11",
  },
  {
    id: 2,
    name: "2-test",
    date: "2022/20/11",
  },
  {
    id: 3,
    name: "Hey",
    date: "2011/50/11",
  },
  {
    id: 4,
    name: "Okay",
    date: "2023/01/11",
  },
]);
</script>

<style scoped></style>
