<template>
  <div
    ref="target"
    class="img-container w-full h-full"
    :style="{ 'background-image': `url(${background})` }"
  >
    <img :alt="alt" />
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
import DEFAULT_IMAGE_PATH from "@/assets/images/no_image.jpg";
import BACKGROUND_IMAGE_PATH from "@/assets/images/bg.jpg";
import { computed } from "vue";

defineOptions({
  name: "Image",
});

const { src, alt = "Image" } = defineProps<{
  src: string;
  alt?: string;
}>();

const target = ref<HTMLDivElement>();
const targetIsVisible = ref(false);
const isLoaded = ref(false);

const background = computed(() => BACKGROUND_IMAGE_PATH);

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting;
  if (isIntersecting) load();
});
const load = () => {
  if (isLoaded.value) return;

  const imageEle = target.value?.children[0];
  if (!imageEle) {
    console.error("Cannot get image element!");
    return;
  }

  imageEle.addEventListener("load", () => {
    isLoaded.value = true;
    imageEle.parentElement?.classList.add("loaded");
  });

  if (!src) {
    imageEle.setAttribute("src", DEFAULT_IMAGE_PATH);
    return;
  }

  imageEle.setAttribute("src", src);
};
</script>

<style scoped>
.img-container {
  @apply bg-no-repeat bg-cover blur;
  /* transition: filter 0.2s; */
}
img {
  object-fit: contain;
  object-position: center;
  aspect-ratio: 1 / 1;
  width: auto;
  height: 100%;
}
.img-container > img {
  @apply opacity-0;
  transition: opacity 0.4s ease-in-out;
}
.img-container.loaded > img {
  @apply opacity-100;
}
.img-container.loaded {
  @apply blur-none;
  background-image: none !important;
}
.img-container::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: pulse 2.5s infinite;
  background-color: white;
}
.img-container.loaded::before {
  animation: none;
  content: none;
}

@keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
  }
}
</style>
