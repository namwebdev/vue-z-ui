<template>
  <button @click="handleClick">Click</button>
</template>

<script setup lang="ts">
import useNotification from "./src/useNotification";

function handleClick() {
  useNotification().notify({
    message: "test",
  });
}
</script>

<style scoped></style>
