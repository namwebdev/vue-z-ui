<template>
  <span> <i :class="className"></i></span>
</template>

<script setup lang="ts">
import { computed } from "vue";

// solid - regular - light - duotone
type Style = "s" | "r" | "l" | "d";
type Size = "xs" | "sm" | "lg";
type IconName = "trash";

const props = defineProps<{
  icon: [Style, IconName];
  size?: Size;
}>();

const className = computed(() => {
  const { icon, size } = props;
  let _class = `fa${icon[0]} fa-${icon[1]}`;
  if (size) _class += ` fa-${size}`;

  return _class;
});
</script>

<script lang="ts">
export default {
  name: "BaseIcon",
  inheritAttrs: false,
};
</script>

<style scoped></style>
