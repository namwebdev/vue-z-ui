<template>
  <div class="multiselect">
    <div
      class="multiselect-input"
      :tabindex="tabindex"
      @focus="openDropdown"
      @blur="closeDropdown"
    >
      <!-- Single label -->
      <template v-if="mode == 'single' && hasSelected && !search && iv">
        <slot name="singlelabel" :value="iv">
          <div class="multiselect-single-label">
            {{ iv[label] }}
          </div>
        </slot>
      </template>

      <!-- Multiple label -->
      <template v-if="mode == 'multiple' && hasSelected && !search">
        <slot name="multiplelabel" :values="iv">
          <div class="multiselect-multiple-label">
            {{ multipleLabelText }}
          </div>
        </slot>
      </template>

      <!-- Search -->
      <template v-if="mode !== 'tags' && searchable && !disabled">
        <div class="multiselect-search">
          <input
            :modelValue="search"
            :value="search"
            @focus.stop="openDropdown"
            @blur.stop="closeDropdown"
            @keyup.stop.esc="handleEsc"
            @keyup.stop.enter="selectPointer"
            @keydown.delete="handleSearchBackspace"
            @keydown.stop.up="
              openDirection === 'top' ? forwardPointer() : backwardPointer()
            "
            @keydown.stop.down="
              openDirection === 'top' ? backwardPointer() : forwardPointer()
            "
            @input="handleSearchInput"
            ref="input"
          />
        </div>
      </template>

      <!-- Tags (with search) -->
      <template v-if="mode == 'tags'">
        <div class="multiselect-tags">
          <span v-for="(option, i, key) in iv" :key="key">
            <slot
              name="tag"
              :option="option"
              :handleTagRemove="handleTagRemove"
              :disabled="disabled"
            >
              <div class="multiselect-tag">
                {{ option[label] }}
                <i
                  v-if="!disabled"
                  @click.prevent
                  @mousedown.prevent.stop="handleTagRemove(option, $event)"
                ></i>
              </div>
            </slot>
          </span>

          <div
            v-if="searchable && !disabled"
            class="multiselect-search"
            :style="{ width: tagsSearchWidth }"
          >
            <input
              :modelValue="search"
              :value="search"
              @focus.stop="openDropdown"
              @blur.stop="closeDropdown"
              @keyup.stop.esc="handleEsc"
              @keyup.stop.enter="handleAddTag"
              @keyup.stop.space="handleAddTag"
              @keydown.delete="handleSearchBackspace"
              @keydown.stop.up="
                openDirection === 'top' ? forwardPointer() : backwardPointer()
              "
              @keydown.stop.down="
                openDirection === 'top' ? backwardPointer() : forwardPointer()
              "
              @input="handleSearchInput"
              :style="{ width: tagsSearchWidth }"
              ref="input"
            />
          </div>
        </div>
      </template>

      <!-- Placeholder -->
      <template v-if="placeholder && !hasSelected && !search">
        <slot name="placeholder">
          <div class="multiselect-placeholder">
            {{ placeholder }}
          </div>
        </slot>
      </template>

      <slot v-if="!hasSelected && caret && !busy" name="caret">
        <span class="multiselect-caret"></span>
      </slot>

      <slot
        v-if="hasSelected && !disabled && !busy && canDeselect"
        name="clear"
        :clear="clear"
      >
        <a class="multiselect-clear" @click.prevent="clear"></a>
      </slot>

      <transition name="multiselect-loading">
        <span v-if="busy">
          <slot name="spinner">
            <span class="multiselect-spinner"></span>
          </slot>
        </span>
      </transition>
    </div>

    <!-- Options -->
    <transition
      v-if="!resolving || !clearOnSearch"
      name="multiselect"
      @after-leave="clearSearch"
    >
      <div
        v-show="isOpen && showOptions"
        class="multiselect-options"
        :style="{ maxHeight: contentMaxHeight }"
      >
        <slot name="beforelist"></slot>

        <span
          v-for="(option, i, key) in fo"
          :tabindex="-1"
          class="multiselect-option"
          :class="{
            'is-pointed': isPointed(option),
            'is-selected': isSelected(option),
            'is-disabled': isDisabled(option),
          }"
          :key="key"
          @mousedown.prevent
          @mouseenter="setPointer(option)"
          @click.stop.prevent="handleOptionClick(option)"
        >
          <slot name="option" :option="option" :search="search">
            <span>{{ option[label] }}</span>
          </slot>
        </span>

        <span v-show="noOptions">
          <slot name="nooptions">
            <div class="multiselect-no-options">{{ noOptionsText }}</div>
          </slot>
        </span>

        <span v-show="noResults">
          <slot name="noresults">
            <div class="multiselect-no-results">{{ noResultsText }}</div>
          </slot>
        </span>

        <slot name="afterlist"></slot>
      </div>
    </transition>

    <!-- Hacky input element to show HTML5 required warning -->
    <input
      v-if="required"
      class="multiselect-fake-input"
      tabindex="-1"
      :value="textValue"
      required
    />

    <template v-if="nativeSupport">
      <input
        v-if="mode == 'single'"
        type="hidden"
        :name="name"
        :value="plainValue !== undefined ? plainValue : ''"
      />
      <template v-else>
        <input
          v-for="(v, i) in plainValue"
          type="hidden"
          :name="`${name}[]`"
          :value="v"
          :key="i"
        />
      </template>
    </template>
  </div>
</template>

<script>
import useData from "./composables/useData";
import useValue from "./composables/useValue";
import useSearch from "./composables/useSearch";
import usePointer from "./composables/usePointer";
import useOptions from "./composables/useOptions";
import usePointerAction from "./composables/usePointerAction";
import useDropdown from "./composables/useDropdown";
import useMultiselect from "./composables/useMultiselect";
import useKeyboard from "./composables/useKeyboard";

export default {
  name: "Multiselect",
  emits: [
    "open",
    "close",
    "select",
    "deselect",
    "input",
    "search-change",
    "tag",
    "update:modelValue",
    "change",
    "clear",
  ],
  props: {
    value: {
      required: false,
    },
    modelValue: {
      required: false,
    },
    options: {
      type: [Array, Object, Function],
      required: false,
      default: () => [],
    },
    id: {
      type: [String, Number],
      required: false,
      default: "multiselect",
    },
    name: {
      type: [String, Number],
      required: false,
      default: "multiselect",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: false,
      default: "label",
    },
    trackBy: {
      type: String,
      required: false,
      default: "label",
    },
    valueProp: {
      type: String,
      required: false,
      default: "value",
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    mode: {
      type: String,
      required: false,
      default: "single", // single|multiple|tags
    },
    searchable: {
      type: Boolean,
      required: false,
      default: false,
    },
    limit: {
      type: Number,
      required: false,
      default: -1,
    },
    maxHeight: {
      type: Number,
      required: false,
      default: 160,
    },
    hideSelected: {
      type: Boolean,
      required: false,
      default: true,
    },
    createTag: {
      type: Boolean,
      required: false,
      default: false,
    },
    appendNewTag: {
      type: Boolean,
      required: false,
      default: true,
    },
    caret: {
      type: Boolean,
      required: false,
      default: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    noOptionsText: {
      type: String,
      required: false,
      default: "The list is empty",
    },
    noResultsText: {
      type: String,
      required: false,
      default: "No results found",
    },
    multipleLabel: {
      type: Function,
      required: false,
    },
    object: {
      type: Boolean,
      required: false,
      default: false,
    },
    delay: {
      type: Number,
      required: false,
      default: -1,
    },
    minChars: {
      type: Number,
      required: false,
      default: 0,
    },
    resolveOnLoad: {
      type: Boolean,
      required: false,
      default: true,
    },
    filterResults: {
      type: Boolean,
      required: false,
      default: true,
    },
    clearOnSearch: {
      type: Boolean,
      required: false,
      default: false,
    },
    clearOnSelect: {
      type: Boolean,
      required: false,
      default: true,
    },
    canDeselect: {
      type: Boolean,
      required: false,
      default: true,
    },
    max: {
      type: Number,
      required: false,
      default: -1,
    },
    showOptions: {
      type: Boolean,
      required: false,
      default: true,
    },
    addTagOn: {
      type: Array,
      required: false,
      default: () => ["enter"],
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    openDirection: {
      type: String,
      required: false,
      default: "bottom",
    },
    nativeSupport: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, context) {
    const value = useValue(props, context);
    const multiselect = useMultiselect(props, context);
    const pointer = usePointer(props, context);

    const data = useData(props, context, {
      iv: value.iv,
    });

    const search = useSearch(props, context, {
      iv: value.iv,
    });

    const dropdown = useDropdown(props, context, {
      multiselect: multiselect.multiselect,
      blurInput: multiselect.blurInput,
      blurSearch: search.blurSearch,
      focusInput: multiselect.focusInput,
      focusSearch: search.focusSearch,
    });

    const options = useOptions(props, context, {
      ev: value.ev,
      iv: value.iv,
      search: search.search,
      blurSearch: search.blurSearch,
      clearSearch: search.clearSearch,
      update: data.update,
      blurInput: multiselect.blurInput,
      pointer: pointer.pointer,
    });

    const pointerAction = usePointerAction(props, context, {
      fo: options.fo,
      handleOptionClick: options.handleOptionClick,
      search: search.search,
      pointer: pointer.pointer,
    });

    const keyboard = useKeyboard(props, context, {
      iv: value.iv,
      update: data.update,
      closeDropdown: dropdown.closeDropdown,
      clearPointer: pointerAction.clearPointer,
      search: search.search,
      selectPointer: pointerAction.selectPointer,
    });

    return {
      ...value,
      ...dropdown,
      ...multiselect,
      ...pointer,
      ...data,
      ...search,
      ...options,
      ...pointerAction,
      ...keyboard,
    };
  },
};
</script>

<style lang="scss" scoped>
.multiselect {
  position: relative;
  margin: 0 auto;
  font-size: 0;
}

.multiselect > * {
  font-size: initial;
}

.multiselect.is-searchable {
  cursor: auto;
}

.multiselect-input {
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 40px;
  border: 1px solid #e7e7e7;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  outline: none;
}

.multiselect-caret {
  position: absolute;
  right: 12px;
  top: 50%;
  color: #999;
  border-style: solid;
  border-width: 5px 5px 0;
  border-color: #999 transparent transparent;
  content: "";
  transform: translateY(-50%);
  transition: 0.3s transform;
}

.is-disabled .multiselect-input {
  background: #f9f9f9;
}

.is-open .multiselect-input {
  border-radius: 3px 3px 0 0;
}

.is-open .multiselect-caret {
  transform: translateY(-50%) rotate(180deg);
}

.multiselect-placeholder,
.multiselect-single-label,
.multiselect-multiple-label {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 14px;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  background: transparent;
}

.multiselect-placeholder {
  color: #777777;
}

.is-single .multiselect-search,
.is-multiple .multiselect-search {
  display: flex;
  height: 100%;
  width: 100%;
  background: transparent;
}

.is-single .multiselect-search input,
.is-multiple .multiselect-search input {
  width: 100%;
  border: 0;
  padding: 8px 35px 8px 14px;
  outline: none;
  background: transparent;
  font-size: 16px;
  font-family: inherit;
}

.is-single.no-caret .multiselect-search input,
.is-multiple.no-caret .multiselect-search input {
  padding: 8px 14px 8px 14px;
}

.is-tags .multiselect-search {
  flex-grow: 1;
}

.is-tags .multiselect-search input {
  outline: none;
  border: 0;
  margin: 0 0 5px 3px;
  flex-grow: 1;
  min-width: 100%;
  font-size: 16px;
  font-family: inherit;
}

.multiselect-clear {
  position: absolute;
  right: 0;
  top: 50%;
  width: 36px;
  height: 36px;
  background: #fff;
  transform: translateY(-50%);

  &:before,
  &:after {
    position: absolute;
    top: 12px;
    left: 16px;
    content: " ";
    height: 12px;
    width: 2px;
    background-color: #999;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }

  &:hover {
    &:before,
    &:after {
      background-color: #555;
    }
  }
}

.multiselect-tags {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding-left: 9px;
  margin-top: 5px;
  flex-wrap: wrap;
  padding-right: 36px;
}

.no-caret .multiselect-tags {
  padding-right: 9px;
}

.multiselect-tag {
  background: #41b883;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 0 0 0 8px;
  border-radius: 3px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  cursor: text;
  white-space: nowrap;
}

.multiselect-tag i {
  cursor: pointer;
}

.multiselect-tag i:before {
  content: "\D7";
  color: #266d4d;
  font-size: 14px;
  font-weight: 700;
  padding: 1px 5px 1px 5px;
  margin-left: 3px;
  display: flex;
  font-style: normal;
}

.multiselect-tag i:hover:before {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.2);
}

.is-disabled .multiselect-tag {
  background: #a0a0a0;
  padding: 1px 8px 1px 8px;
}

.multiselect-fake-input {
  background: transparent;
  width: 100%;
  height: 1px;
  border: 0;
  padding: 0;
  font-size: 0;
  margin-top: -1px;
  outline: none;

  &:active,
  &:focus {
    outline: none;
  }
}

.multiselect-options {
  position: absolute;
  left: 0;
  right: 0px;
  border: 1px solid #e8e8e8;
  margin-top: -1px;
  max-height: 160px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 100;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.open-top .multiselect-options {
  transform: translateY(-100%);
  top: 2px;
  flex-direction: column-reverse;
}

.multiselect-option {
  display: flex;
  min-height: 40px;
  padding: 9px 12px;
  box-sizing: border-box;
  color: #222;
  text-decoration: none;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  cursor: pointer;
}

.multiselect-option.is-pointed {
  background: #e6e6e6;
}

.multiselect-option.is-disabled {
  background: #f9f9f9;
  color: #a6a6a6;
  cursor: not-allowed;
}

.multiselect-option.is-selected {
  background: #41b883;
  color: #ffffff;
}

.multiselect-option.is-selected.is-pointed {
  background: #4fbd8c;
}

.is-multiple .multiselect-option.is-selected,
.is-tags .multiselect-option.is-selected {
  color: #999999;
  background: transparent;
}

.is-multiple .multiselect-option.is-selected.is-pointed,
.is-tags .multiselect-option.is-selected.is-pointed {
  background: #f1f1f1;
}

.multiselect-no-options,
.multiselect-no-results {
  display: flex;
  padding: 10px 12px;
  color: #777;
}

.multiselect-spinner {
  position: absolute;
  right: 12px;
  top: 0;
  width: 16px;
  height: 16px;
  background: #fff;
  display: block;
  transform: translateY(50%);
}

.multiselect-spinner:before,
.multiselect-spinner:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-color: #41b883 transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}

.is-disabled .multiselect-spinner {
  background: #f9f9f9;
}

.is-disabled .multiselect-spinner:before,
.is-disabled .multiselect-spinner:after {
  border-color: #999999 transparent transparent;
}

.multiselect-spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}
.multiselect-spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}

.multiselect-enter-active {
  transition: all 0.15s ease;
}

.multiselect-leave-active {
  transition: all 0s;
}

.multiselect-enter,
.multiselect-leave-active {
  opacity: 0;
}

.multiselect-loading-enter-active,
.multiselect-loading-leave-active {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}
.multiselect-loading-enter,
.multiselect-loading-leave-active {
  opacity: 0;
}

@keyframes spinning {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2turn);
  }
}
</style>
