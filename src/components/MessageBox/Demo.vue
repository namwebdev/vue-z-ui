<template>
  <div>
    <button @click="open">Open Message Box</button>
  </div>
</template>

<script setup lang="ts">
import MessageBox from "./src";

function open() {
  MessageBox.show();
}
</script>

<style scoped></style>
