<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { onMounted } from "vue";
import { ref, computed, useSlots } from "vue";

const button = cva("_button", {
  variants: {
    intent: {
      primary: "primary",
      secondary: "secondary",
    },
    size: {
      default: "default",
      small: "small",
      medium: "medium",
    },
    loading: { true: "is-busy" },
  },
});

type ButtonProps = VariantProps<typeof button>;

const props = withDefaults(
  defineProps<{
    intent: ButtonProps["intent"];
    size: ButtonProps["size"];
    loading: ButtonProps["loading"];
  }>(),
  { intent: "primary", size: "default", loading: false }
);

const emit = defineEmits(["click"]);
const slots = useSlots();

const buttonRef = ref<HTMLButtonElement>();
const aspectRatio = ref(0);

const shouldAddSpace = computed(() => !slots.loading && props.loading);

onMounted(() => {
  if (!buttonRef.value) return;

  const width = buttonRef.value.offsetWidth;
  const height = buttonRef.value.offsetHeight;
  aspectRatio.value = width / height;
});
</script>

<template>
  <button
    ref="buttonRef"
    :style="{ '--button-aspect-ratio': aspectRatio }"
    :class="button({ intent, size, loading })"
    :disabled="(loading as boolean)"
    @click="$emit('click')"
  >
    <template v-if="loading">
      <slot name="loading" v-if="$slots.loading" />
      <div v-else class="_loading"></div>
    </template>
    <span :class="{ 'ml-1': shouldAddSpace }">
      <slot />
    </span>
  </button>
</template>

<style scoped>
._button {
  @apply inline-flex justify-center items-center text-white rounded hover:brightness-95 focus:outline-none focus:ring-offset-1 transform active:scale-95 transition duration-150 ease-in-out;
}
._button:disabled,
._button[disabled] {
  @apply opacity-70 pointer-events-none;
}
/* intent */
.primary {
  @apply bg-blue-600 hover:bg-blue-600/80;
}
.primary:disabled,
.primary[disabled] {
  @apply bg-blue-600/70;
}
.secondary {
  @apply bg-slate-200 text-black;
}
/* size */
.default {
  @apply h-10 py-2 px-4;
}
.small {
  @apply h-9 px-3 text-sm;
}
/* loading */
._loading {
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 4px solid #514b82;
  animation: spinner-1 1s infinite linear alternate,
    spinner-2 2s infinite linear;
}
@keyframes spinner-1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  12.5% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 0%,
      100% 0%,
      100% 0%
    );
  }
  25% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      100% 100%,
      100% 100%
    );
  }
  50% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  62.5% {
    clip-path: polygon(
      50% 50%,
      100% 0,
      100% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  75% {
    clip-path: polygon(
      50% 50%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  100% {
    clip-path: polygon(
      50% 50%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      0% 100%
    );
  }
}
@keyframes spinner-2 {
  0% {
    transform: scaleY(1) rotate(0deg);
  }
  49.99% {
    transform: scaleY(1) rotate(135deg);
  }
  50% {
    transform: scaleY(-1) rotate(0deg);
  }
  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}
</style>
