<template>
  <div class="w-44 relative" v-click-outside="close">
    <input
      v-if="isSearch"
      type="text"
      value=""
      class="select"
      @click="open"
      @input="handleInput"
    />
    <div v-else class="select" @click="open">
      <div v-if="hasSelected">
        <!-- Multiple label -->
        <template v-if="multiple">
          <slot name="multilabel">
            <div v-if="isTag" class="flex flex-wrap">
              <div
                v-for="(option, index) in value"
                :key="option.id || index"
                class="mr-2"
                @click.stop="removeTag(option)"
              >
                {{ option[labelText] }}
              </div>
            </div>
            <div v-else class="flex flex-wrap">
              {{ multipleLabelText }}
            </div>
          </slot>
        </template>
        <!-- Single label -->
        <template v-if="!multiple">
          <slot name="singlelabel">
            <div class="">
              {{ value[labelText] }}
            </div>
          </slot>
        </template>
      </div>
      <div v-if="!hasSelected">
        {{ placeholder }}
      </div>
    </div>

    <span class="select-arrow" :class="{ active: show }">
      <svg
        v-show="!loading"
        class="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>

      <div v-show="loading" class="spinner"></div>
    </span>

    <ul
      v-show="show"
      id="select-list"
      class="
        absolute
        z-10
        bg-white
        border-2 border-gray-200
        overflow-y-auto
        w-full
        h-56
        text-gray-700
        rounded-md
      "
    >
      <li
        v-for="(item, index) in options"
        :key="item.id || index"
        class="option"
        @click="select(item)"
        :class="{ active: isSelected(item), disabled: item.disabled }"
      >
        {{ item.text }}
      </li>
      <li v-show="loadMore" class="flex justify-center">
        <slot name="loadMore">
          <div class="spinner"></div>
        </slot>
      </li>
      <li v-if="isShowNoMore" class="text-center pb-2">
        <slot name="noMoreResult">No more result</slot>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { isEmpty } from "lodash";

export default {
  name: "Select",
  props: {
    value: {
      default: () => {},
    },
    options: {
      type: Array,
      default: () => [],
    },
    labelText: {
      type: String,
      default: () => "text",
    },
    placeholder: {
      type: String,
      default: () => "Select",
    },
    multiple: {
      type: Boolean,
      default: () => false,
    },
    limit: {
      type: Number,
      default: () => 2,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    isTag: {
      type: Boolean,
      default: () => true,
    },
    loadMore: {
      type: Boolean,
      default: () => false,
    },
    isShowNoMore: {
      type: Boolean,
      default: () => false,
    },
    isSearch: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: ["update:value", "input"],
  setup(props, { emit }) {
    const show = ref(false);
    const search = reactive({});

    const hasSelected = computed(() => {
      return !isEmpty(props.value);
    });
    const multipleLabelText = computed(() => {
      const { multiple, value, labelText } = props;
      if (!multiple && !Array.isArray(value)) return "";

      return value.map((o) => o[labelText]).join(", ");
    });

    const open = () => {
      show.value = !show.value;
    };
    function close() {
      show.value = false;
    }
    function select(option) {
      const finalValue = props.multiple ? handleMultipleOption(option) : option;

      emit("update:value", finalValue);
      if (!props.multiple) close();
    }
    function handleMultipleOption(option) {
      const { value } = props;
      const initialVal = isEmpty(value) ? [] : value;
      const oldPropsValue = Array.isArray(value) ? value : initialVal;
      return oldPropsValue.includes(option)
        ? oldPropsValue.filter((o) => o !== option)
        : [option, ...oldPropsValue];
    }
    function isSelected(option) {
      const { multiple, value } = props;
      if (multiple) return value.includes(option);
      else return value === option;
    }
    function removeTag(option) {
      select(option);
    }
    function handleInput(e) {
      emit("input", e.target.value);
    }

    return {
      show,
      hasSelected,
      multipleLabelText,
      search,
      open,
      close,
      select,
      isSelected,
      removeTag,
      handleInput,
    };
  },
};
</script>

<style lang="css" scoped>
.select {
  @apply border-gray-200 rounded border py-1 px-2 w-full;
}
.select-arrow {
  top: 28%;
  @apply absolute right-2 transition-all duration-150;
}
.select-arrow.active {
  transform: rotate(-180deg);
}
input:focus {
  @apply border-primary;
}
.option {
  @apply text-lg cursor-pointer px-2 transition-all duration-100 hover:bg-primary hover:text-white;
}
.option.active {
  @apply bg-gray-300;
}
.option.active:hover {
  @apply bg-red-300;
}
.option.disabled {
  @apply bg-gray-200 opacity-60 pointer-events-none hover:text-black;
}

/* loading */
.spinner {
  width: 15px;
  height: 15px;
  background: conic-gradient(#0000 10%, #0abde3);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 2px), #000 0);
  animation: loader 1s infinite linear;
  @apply rounded-circle;
}
@keyframes loader {
  to {
    transform: rotate(1turn);
  }
}
</style>
