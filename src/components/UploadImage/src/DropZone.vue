<template>
  <div
    upload-zone
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <slot :isActive="active" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "UploadDropZone",
});

const emit = defineEmits<{
  (e: "drop-file", file: File): void;
}>();

const active = ref(false);
let inActiveTimeout: any;

function setActive() {
  active.value = true;
  window.clearTimeout(inActiveTimeout);
}
function setInactive() {
  window.setTimeout(() => (active.value = false), 40);
}
function onDrop(e: any) {
  emit("drop-file", e.dataTransfer.files[0] as File);
  active.value = false;
}
</script>
