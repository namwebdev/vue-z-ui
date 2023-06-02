<template>
  <div
    ref="container"
    class="relative w-full h-full flex items-center justify-center"
  >
    <img :src="file.url" :alt="file.id" />
    <transition name="slide-down">
      <div v-show="isHovered">
        <span class="icon top-1 right-2" @click="$emit('change')">
          <i class="fal fa-pen fa-xs"></i
        ></span>
        <span class="icon top-8 right-2" @click="$emit('remove')">
          <i class="far fa-times fa-xs"></i
        ></span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useElementHover } from "@vueuse/core";
import { ImageObj } from "./types";
import { ref } from "vue";

defineOptions({
  name: "UploadPreview",
});

defineProps<{
  file: ImageObj;
}>();

const emit = defineEmits<{
  (e: "change"): void;
  (e: "remove"): void;
}>();

const container = ref<HTMLDivElement>();
const isHovered = useElementHover(container);
</script>

<style scoped>
.icon {
  @apply absolute w-6 h-6 rounded-[50%] border-[1px] flex justify-center items-center cursor-pointer bg-transparent hover:text-white hover:bg-black hover:border-0;
  transition: all 0.2s ease;
}
</style>
