<template>
  <div class="p-10">
    <div
      class="dropdown inline-block relative"
      @mouseover="show = true"
      @mouseleave="show = false"
    >
      <button
        class="
          bg-gray-300
          text-gray-700
          font-semibold
          py-2
          px-4
          rounded
          inline-flex
          items-center
        "
      >
        <span class="mr-1">
          <slot name="header" />
        </span>
        <span class="dropdown-arrow transition duration linear">
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul v-show="show" class="absolute text-gray-700 pt-1 rounded-md">
        <slot />
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

const triggerTypes = ["hover", "click"];

export default {
  name: "Dropdown",
  props: {
    title: {
      type: String,
      default: () => "",
    },
    trigger: {
      type: String,
      validator(val) {
        return triggerTypes.includes(val);
      },
      default: () => "hover",
    },
  },
  setup() {
    const show = ref(false);

    // const triggerType = computed(() => {
    //   const { type } = props;
    //   if (triggerTypes.includes(type)) return type;
    //   return "hover";
    // });

    return { show };
  },
};
</script>

<style lang="scss">
.dropdown:hover {
  .dropdown-arrow {
    transform: rotate(-180deg);
  }
}
</style>
