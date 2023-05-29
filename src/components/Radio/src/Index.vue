<template>
  <div>
    <component
      v-for="{ value, label, id } in optionsWithId"
      :key="id"
      :is="vertical ? 'div' : 'span'"
      :style="vertical ? '' : 'margin-right: 20px;'"
    >
      <input
        type="radio"
        @change="onChange"
        :value="value"
        :checked="modelValue === value"
        :id="id"
      />
      <label v-if="label" :for="id" class="cursor-pointer">
        {{ label }}
      </label>
    </component>
    <BaseErrorMessage :message="errorMessage" />
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from "vue";
import BaseErrorMessage from "../../BaseErrorMessage.vue";

interface Options {
  value: number;
  label: string;
}

export default defineComponent({
  name: "BaseRadioGroup",
  components: { BaseErrorMessage },
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Number as PropType<number | null>,
      required: true,
    },
    options: {
      type: Array as PropType<Options[]>,
      required: true,
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const optionsWithId = computed(() => {
      return props.options.map((o) => {
        return {
          ...o,
          ...{ id: Math.random().toString() },
        };
      });
    });

    function onChange(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      emit("update:modelValue", Number(value));
    }

    return { onChange, optionsWithId };
  },
});
</script>
