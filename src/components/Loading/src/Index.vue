<template>
  <transition name="fade">
    <div class="spinner-1"></div>
  </transition>
</template>

<script setup lang="ts"></script>

<style scoped>
.spinner-1 {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  border-color: #000 #0000;
  animation: s1 1s infinite;
}
@keyframes s1 {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
