<template>
  <li class="dropdown-item">
    <slot />
  </li>
</template>

<script>
export default {
  name: "DropdownItem",
};
</script>

<style lang="css">
.dropdown-item {
  min-width: 90px;
  @apply bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-nowrap cursor-pointer;
}
</style>
