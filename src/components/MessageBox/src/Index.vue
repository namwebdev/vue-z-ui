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
    <div
      v-show="visible"
      class="fixed z-10 inset-0 overflow-hidden bg-black bg-opacity-50"
      @click="onClickOnMask"
    >
      <div
        role="dialog"
        aria-modal="true"
        class="flex h-screen justify-center items-center py-14 z-20"
      >
        <div
          v-loading="state.boxLoading"
          class="w-11/12 h-32 bg-white text-black py-3 px-5 rounded shadow-sm md:w-3/5"
          @click.stop=""
        >
          <div>{{ state.title }}</div>
          <div>{{ state.message }}</div>
          <div>
            <button @click="handleAction('close')">close</button>
            <button @click="handleAction('confirm')" class="ml-2">
              <span v-if="state.iconClass"
                ><i :class="state.iconClass"></i
              ></span>
              confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import { Action, IconClass } from "./types";
import { MessageBoxState } from "./types";
import Loading from "../../../directives/loading/loading";

export default defineComponent({
  name: "MessageBox",
  emits: ["vanish", "action"],
  directives: { Loading },
  setup(props, { emit }) {
    const state = reactive<MessageBoxState>({
      title: "",
      message: "",
      iconClass: "" as unknown as IconClass,
      boxLoading: false,
      confirmButtonLoading: false,
      onConfirm: () => {},
    });
    const visible = ref(false);

    // function
    const doClose = () => {
      if (visible.value) visible.value = false;
    };
    const close = () => {
      visible.value = false;
    };
    const handleAction = (action: Action) => {
      if (action === "confirm" && state.onConfirm) {
        state.onConfirm(state, doClose);
        return emit("action", action);
      }
      emit("action", action);
      doClose();
    };
    const onClickOnMask = () => {
      if (state.boxLoading || state.confirmButtonLoading) return;
      close();
    };

    return { state, visible, handleAction, close, onClickOnMask };
  },
});
</script>

<style scoped></style>
