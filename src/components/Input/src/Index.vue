<template>
  <div>
    <div
      class="input border border-light-gray py-2 px-3 w-full rounded-sm shadow-sm font-thin duration-100 shadow-gray-100 hover:shadow-lg flex justify-center items-center"
      :class="{
        'border-red-500': errorMessage,
        'outline outline-0 shadow-lg border-primary-700': isFocus,
      }"
    >
      <slot name="prefix"></slot>
      <input
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        class="w-full bg-transparent pl-2"
        @focus="isFocus = true"
        @blur="isFocus = false"
        :value="modelValue"
        @input="updateValue"
      />
      <slot name="affix"></slot>
    </div>
    <BaseErrorMessage :message="errorMessage" />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from "vue";
import BaseErrorMessage from "../../BaseErrorMessage.vue";

export default defineComponent({
  name: "BaseInput",
  components: { BaseErrorMessage },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<"text" | "password">,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isFocus = ref(false);

    function updateValue(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      emit("update:modelValue", value);
    }

    return { isFocus, updateValue };
  },
});
</script>

<style lang="css" scoped>
input:focus-visible {
  outline: none;
}
</style>
