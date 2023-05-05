<template>
  <transition
    enter-active-class="transition ease-out duration-200 transform"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200 transform"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    @after-leave="$emit('vanish')"
  >
    <div v-show="visible" class="overlay" @click="close">
      <div
        role="dialog"
        aria-modal="true"
        class="flex h-screen justify-center items-center py-14 z-20"
      >
        <div data-id="dialog-container" @click.stop="">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import { Action } from "./types";

export default defineComponent({
  name: "Dialog",
  emits: ["vanish", "action"],
  setup(props, { emit }) {
    const visible = ref(false);

    // function
    const doClose = () => {
      if (visible.value) visible.value = false;
    };
    const close = () => {
      visible.value = false;
    };

    return { visible, close };
  },
});
</script>

<style scoped></style>
