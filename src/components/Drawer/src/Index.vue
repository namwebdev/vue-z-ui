<template>
  <transition name="slide">
    <div v-show="show" class="slide-container">
      <!-- Your content goes here -->
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts" setup>
defineProps<{
  show: boolean;
}>();
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
.slide-leave,
.slide-enter-to {
  transform: translateX(0);
}
.slide-container {
  position: absolute;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}
</style>
