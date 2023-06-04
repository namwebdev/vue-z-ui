<template>
  <teleport to="body">
    <!-- Notification -->
    <div id="notification">
      <transition-group name="notifications">
        <Item
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
          @close="clearOne(notification?.id as number)"
        />
      </transition-group>
    </div>
    <!--  -->
  </teleport>
</template>

<script setup lang="ts">
import useNotification from "./useNotification";
import Item from "./Item.vue";

const { notifications, clearOne } = useNotification();
</script>

<style scoped>
#notification {
  @apply fixed z-50 right-5 top-5 overflow-hidden;
}
.notification-enter-from {
  @apply origin-top-left scale-0 opacity-0;
}
.notification-enter-to,
.notification-leave-from {
  @apply scale-100 opacity-100;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
