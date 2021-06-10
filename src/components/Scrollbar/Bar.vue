<template>
  <transition
    enter-active-class="transition ease-out duration-100 transform"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-100 transform"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="visible" class="thumb" :style="thumbStyle"></div>
  </transition>
</template>

<script>
import { ref, inject, computed, onMounted, onBeforeUnmount } from "vue";
import { on, off } from "@/utils/dom.js";

export default {
  name: "Bar",
  props: {
    size: String,
    move: Number,
    vertical: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const instance = ref(null);
    const thumb = ref(null);
    const scrollbar = inject("scrollbar", {});
    const wrap = inject("scrollbar-wrap", {});
    const bar = computed(
      () => BAR_MAP[props.vertical ? "vertical" : "horizontal"]
    );
    const barStore = ref({});
    const cursorDown = ref(null);
    const cursorLeave = ref(null);
    const visible = ref(false);
    let onselectstartStore = null;

    const BAR_MAP = {
      vertical: {
        offset: "offsetHeight",
        scroll: "scrollTop",
        scrollSize: "scrollHeight",
        size: "height",
        key: "vertical",
        axis: "Y",
        client: "clientY",
        direction: "top",
      },
      horizontal: {
        offset: "offsetWidth",
        scroll: "scrollLeft",
        scrollSize: "scrollWidth",
        size: "width",
        key: "horizontal",
        axis: "X",
        client: "clientX",
        direction: "left",
      },
    };

    const thumbStyle = computed(() =>
      renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.value,
      })
    );

    onMounted(() => {
      on(scrollbar.value, "mousemove", mouseMoveScrollbarHandler);
      on(scrollbar.value, "mouseleave", mouseLeaveScrollbarHandler);
    });

    onBeforeUnmount(() => {
      off(document, "mouseup", mouseUpDocumentHandler);
      off(scrollbar.value, "mousemove", mouseMoveScrollbarHandler);
      off(scrollbar.value, "mouseleave", mouseLeaveScrollbarHandler);
    });

    const mouseMoveDocumentHandler = (e) => {
      if (cursorDown.value === false) return;
      const prevPage = barStore.value[bar.value.axis];

      if (!prevPage) return;

      const offset =
        (instance.value.getBoundingClientRect()[bar.value.direction] -
          e[bar.value.client]) *
        -1;
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100) /
        instance.value[bar.value.offset];
      wrap.value[bar.value.scroll] =
        (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100;
    };

    const mouseUpDocumentHandler = () => {
      cursorDown.value = false;
      barStore.value[bar.value.axis] = 0;
      off(document, "mousemove", mouseMoveDocumentHandler);
      document.onselectstart = onselectstartStore;
      if (cursorLeave.value) {
        visible.value = false;
      }
    };
    const clickThumbHandler = (e) => {
      // prevent click event of middle and right button
      e.stopPropagation();
      if (e.ctrlKey || [1, 2].includes(e.button)) {
        return;
      }
      window.getSelection().removeAllRanges();
      startDrag(e);
      barStore.value[bar.value.axis] =
        e.currentTarget[bar.value.offset] -
        (e[bar.value.client] -
          e.currentTarget.getBoundingClientRect()[bar.value.direction]);
    };
    const startDrag = (e) => {
      e.stopImmediatePropagation();
      cursorDown.value = true;
      on(document, "mousemove", mouseMoveDocumentHandler);
      on(document, "mouseup", mouseUpDocumentHandler);
      onselectstartStore = document.onselectstart;
      document.onselectstart = () => false;
    };
    const mouseMoveScrollbarHandler = () => {
      cursorLeave.value = false;
      visible.value = !!props.size;
    };

    const mouseLeaveScrollbarHandler = () => {
      cursorLeave.value = true;
      visible.value = cursorDown.value;
    };
    function renderThumbStyle({ move, size, bar }) {
      const style = {};
      const translate = `translate${bar.axis}(${move}%)`;

      style[bar.size] = size;
      style.transform = translate;
      style.msTransform = translate;
      style.webkitTransform = translate;

      return style;
    }

    return {
      instance,
      thumb,
      bar,
      thumbStyle,
      visible,
      clickThumbHandler,
    };
  },
};
</script>

<style lang="css" scoped>
.thumb {
  @apply absolute right-0 top-0 w-1.5 bg-gray-300 rounded transition-colors cursor-pointer duration-100 hover:bg-gray-400;
}
</style>
