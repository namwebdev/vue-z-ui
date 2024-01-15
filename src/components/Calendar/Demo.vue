<template>
  <div class="w-60">
    <DatePicker></DatePicker>
    <DPicker v-model="date" class="mt-10" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DatePicker from "./_src/litepie-datepicker.vue";
import DPicker from "./src/Index.vue";

const date = ref();
</script>

<style lang="scss" scoped></style>
