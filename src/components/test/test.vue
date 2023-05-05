<template>
  <div class="h-56 w-56 bg-white text-black">
    <div class="text-4xl">w</div>
    <button @click="$emit('action', 'confirm')">click</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Testqqqq",
  emits: ["vanish", "action"],
  setup() {
    const data = ref([]);

    const onClick = () => {};

    return { data };
  },
});
</script>

<style scoped></style>
