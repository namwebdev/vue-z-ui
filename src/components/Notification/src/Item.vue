<template>
  <div
    class="w-64 rounded-md shadow-sm mb-4 px-6 py-2 text-white cursor-pointer transition duration-200 ease-in-out"
    :class="notification.type"
    @click="onClose"
  >
    <div class="capitalize font-bold">{{ notification.title }}</div>
    <div class="text-sm">{{ notification.message }}</div>
  </div>
</template>

<script setup lang="ts">
import { Notification } from "./types";

const { notification } = defineProps<{
  notification: Notification;
}>();
const emit = defineEmits<{
  (e: "close"): void;
}>();

autoCloseHandler();

function autoCloseHandler() {
  setTimeout(() => onClose(), notification.timer);
}

function onClose() {
  emit("close");
}
</script>

<style scoped>
.success {
  @apply bg-green-300 hover:bg-green-500;
}
.warning {
  @apply bg-yellow-300 hover:bg-yellow-500;
}
.error {
  @apply bg-red-300 hover:bg-red-500;
}
</style>
