<template>
  <ul class="menu">
    <li v-for="(menu, index) in menus" :key="index">
      <div
        class="py-1"
        :class="{ 'cursor-pointer hover:text-cyan-400': !menu.menus }"
      >
        <span>
          <i :class="menu.icon"></i>
        </span>
        {{ menu.name }}
      </div>
      <ul v-if="menu.menus">
        <li
          v-for="({ icon, name }, subIndex) in menu.menus"
          :key="subIndex"
          class="ml-8 pb-1 cursor-pointer hover:text-cyan-400"
        >
          {{ name }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Icon from "../../Icon/Index.vue";

interface Menu {
  name: string;
  icon?: string;
  menus?: Menu[];
}

const menus = ref<Menu[]>([
  {
    name: "Home",
    icon: "far fa-home",
  },
  {
    name: "Dashboard",
    icon: "fas fa-chart-bar",
    menus: [
      {
        name: "Analytics",
        icon: "home",
      },
      {
        name: "Analytics",
        icon: "home",
      },
    ],
  },
  {
    name: "Settings",
    icon: "fas fa-cog",
    menus: [
      {
        name: "Analytics",
        icon: "home",
      },
      {
        name: "Analytics",
        icon: "home",
      },
      {
        name: "Analytics",
        icon: "home",
      },
      {
        name: "Analytics",
        icon: "home",
      },
    ],
  },
]);
</script>

<script lang="ts">
export default {
  name: "SideBar",
  inheritAttrs: false,
};
</script>

<style scoped>
.menu {
  @apply px-5 py-4 h-screen fixed;
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.1), 0 3px 20px rgba(0, 0, 0, 0.1);
}
</style>
