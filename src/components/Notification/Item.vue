<template>
  <div
    class="
      w-64
      rounded-md
      shadow-sm
      mb-4
      px-6
      py-2
      text-white
      cursor-pointer
      transition
      duration-200
      ease-in-out
    "
    :class="notiType"
    @click="onClose"
  >
    <div class="capitalize font-bold">{{ notiType }}</div>
    <div class="text-sm">{{ message }}</div>
  </div>
</template>

<script>
import { computed } from "vue";

const types = ["success", "warning", "error"];

export default {
  props: {
    type: {
      type: String,
      validator(value) {
        return types.includes(value);
      },
      default: () => "error",
    },
    message: {
      type: String,
      default: () => "Something went wrong",
    },
    timer: {
      type: Number,
      default: () => 4000,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const notiType = computed(() => {
      if (types.includes(props.type)) return props.type;
      return "error";
    });

    autoCloseHanlder();

    function autoCloseHanlder() {
      setTimeout(() => onClose(), props.timer);
    }

    function onClose() {
      emit("close");
    }

    return { notiType, onClose };
  },
};
</script>

<style lang="css">
.success {
  @apply bg-green-300 hover:bg-green-500;
}
.warning {
  @apply bg-yellow-300 hover:bg-yellow-500;
}
.error {
  @apply bg-red-300 hover:bg-red-500;
}
</style>
