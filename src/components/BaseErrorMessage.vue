<template>
  <div class="h-4 w-full">
    <div
      v-show="message"
      aria-live="assertive"
      class="text-red-500 text-xs h-full"
    >
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseErrorMessage",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
});
</script>
