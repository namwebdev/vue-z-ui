<template>
  <Cascader :options="options" v-model="selectedIds" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { data } from "./data";
import Cascader from "./src/Index.vue";

const selectedIds = ref<number[]>([4308, 6394, 6397, 11164]);
const options = computed(() => data);
</script>

<style scoped></style>
