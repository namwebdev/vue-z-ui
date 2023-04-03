<template>
  <div
    class="flex justify-between cursor-pointer hover:bg-slate-500"
    :class="{ 'text-blue-600': selectedIds.includes(menu.id) }"
    @click="select(menu)"
  >
    <div>{{ menu.name_vn }}</div>
    <div v-if="menu.children">></div>
  </div>
</template>

<script setup lang="ts">
import { Menu } from "./types";
import useCascader from "./useCascader";

defineProps<{ menu: Menu }>();
const { select, selectedIds } = useCascader();
</script>

<style scoped></style>
