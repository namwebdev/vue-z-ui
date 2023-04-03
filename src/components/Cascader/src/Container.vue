<template>
  <div class="h-80 w-72 overflow-scroll">
    <Item v-for="item in menu" :key="item.id" :menu="item" />
  </div>
</template>

<script setup lang="ts">
import { Menu } from "./types";
import Item from "./Item.vue";

const props = defineProps<{ menu: Menu[] }>();
</script>

<style scoped></style>
