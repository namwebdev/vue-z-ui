<template>
  <teleport to="body">
    <div class="fixed z-999 right-5 top-5 overflow-hidden">
      <transition-group name="notifications">
        <notification-item
          v-for="notify in notifications"
          :key="notify.id"
          :type="notify.type"
          :message="notify.message"
          @close="clearNotify(notify.id)"
        />
      </transition-group>
    </div>
  </teleport>
</template>

<script>
import { ref, inject } from "vue";
import NotificationItem from "@/components/Notification/Item.vue";

export default {
  components: { NotificationItem },
  setup() {
    const event = inject("event");
    const notifications = ref([]);

    newNotifyListener();

    function newNotifyListener() {
      event.on("notify", (params = {}) => {
        const { type, message, timer } = params;
        const newNotify = {
          id: Math.floor(Math.random() * 200),
          type,
          message,
          timer,
        };
        notifications.value = [newNotify, ...notifications.value];
      });
    }
    function clearNotify(id) {
      notifications.value = notifications.value.filter(
        (notify) => notify.id !== id
      );
    }

    return { notifications, clearNotify };
  },
};
</script>

<style lang="css">
/* notifications transitions */
.notifications-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.notifications-enter-active {
  transition: all 0.4s ease;
}
.notifications-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.notifications-leave-active {
  transition: all 0.4s ease;
}
</style>
