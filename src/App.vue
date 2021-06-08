<template>
  <router-view />
  <Notification />
</template>

<script>
import Notification from "@/components/Notification/Index.vue";

export default {
  name: "App",
  components: { Notification },
};
</script>
