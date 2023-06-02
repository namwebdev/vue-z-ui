<template>
  <div class="mt-4 w-56 mr-10 h-52">
    <Upload ref="upload" :formats="['a', 'png']" />
    <button @click="upload?.upload()">Upload</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Upload from "./src/Index.vue";

const upload = ref<typeof Upload>();
</script>

<style scoped></style>
