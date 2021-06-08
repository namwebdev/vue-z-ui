<template>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="visible"
        class="fixed z-1 inset-0 overflow-hidden bg-black bg-opacity-50"
        @click="onCloseClickMask"
        @keyup.esc="onClosePressEscape"
      >
        <div
          class="flex h-screen justify-center py-14 z-10"
          :class="{ 'items-center': isCenter }"
        >
          <div
            data-test="modal"
            class="
              w-11/12
              h-32
              bg-white
              text-black
              py-3
              px-5
              rounded
              shadow-sm
              md:w-3/5
            "
            @click.stop=""
          >
            <slot name="title">
              <div data-test="modal-title" class="font-bold text-xl">Title</div>
            </slot>
            <slot name="body">
              <div class="text-right">
                <button @click.stop="onClose">Close</button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { onBeforeMount, onBeforeUnmount } from "vue";

export default {
  name: "Modal",
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
    isCenter: {
      type: Boolean,
      default: () => true,
    },
    closeOnClickOutside: {
      type: Boolean,
      default: () => true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: () => true,
    },
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    onBeforeMount(() => {
      window.addEventListener("keyup", onClosePressEscape);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("keyup", onClosePressEscape);
    });

    function onClose() {
      emit("update:visible", false);
      emit("hide");
    }
    function onCloseClickMask() {
      if (props.closeOnClickOutside) onClose();
    }
    function onClosePressEscape(e) {
      if (e.which === 27 && props.closeOnPressEscape) onClose();
    }

    return { onClose, onCloseClickMask, onClosePressEscape };
  },
};
</script>
