<template>
  <ul class="flex items-center">
    <li
      class="pagination-btn"
      :class="{ disabled: currentPage === 1 }"
      @click="handleChangePage('prev')"
    >
      <i class="fas fa-chevron-left"></i>
    </li>
    <li
      class="pagination-btn"
      :class="{ active: currentPage === 1 }"
      @click="handleChangePage(1)"
    >
      1
    </li>
    <li v-show="showPrevMore"><i class="fas fa-ellipsis-h"></i></li>
    <li
      v-for="pager in pagers"
      :key="pager"
      class="pagination-btn"
      :class="{ active: currentPage === pager }"
      @click="handleChangePage(pager)"
    >
      {{ pager }}
    </li>
    <li v-show="showNextMore"><i class="fas fa-ellipsis-h"></i></li>
    <li
      class="pagination-btn"
      :class="{ active: currentPage === totalPages }"
      @click="handleChangePage(totalPages)"
    >
      {{ totalPages }}
    </li>
    <li
      class="pagination-btn"
      :class="{ disabled: currentPage === totalPages }"
      @click="handleChangePage('next')"
    >
      <i class="fas fa-chevron-right"></i>
    </li>
  </ul>
</template>

<script>
import { ref, computed, watchEffect } from "vue";

export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: () => 1,
    },
    totalPages: {
      type: Number,
      default: () => 1,
    },
    pagersCount: {
      // Must be odd number and greater than 1
      type: Number,
      default: () => 7,
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const showPrevMore = ref(false);
    const showNextMore = ref(false);

    const pagers = computed(() => {
      const { currentPage, totalPages, pagersCount } = props;
      const isShowPrev = showPrevMore.value;
      const isShowNext = showNextMore.value;

      const array = [];
      if (isShowPrev && !isShowNext) {
        const startPage = totalPages - (pagersCount - 2);
        for (let i = startPage; i < totalPages; i++) array.push(i);
      } else if (!isShowPrev && isShowNext) {
        for (let i = 2; i < pagersCount; i++) array.push(i);
      } else if (isShowPrev && isShowNext) {
        const offset = Math.floor(pagersCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++)
          array.push(i);
      } else for (let i = 0; i < totalPages; i++) array.push(i);

      return array;
    });

    watchEffect(() => handleShowMore());

    function handleShowMore() {
      const { currentPage, totalPages, pagersCount } = props;
      const halfPagerCount = (pagersCount - 1) / 2;
      showPrevMore.value = false;
      showNextMore.value = false;

      if (totalPages > pagersCount) {
        if (currentPage > pagersCount - halfPagerCount)
          showPrevMore.value = true;
        if (currentPage < totalPages - halfPagerCount)
          showNextMore.value = true;
      }
    }
    function handleChangePage(argument) {
      const { currentPage, totalPages } = props;
      switch (argument) {
        case "prev":
          if (currentPage === 1) return;
          emit("change", Number(currentPage - 1));
          break;
        case "next":
          if (currentPage === totalPages) return;
          emit("change", Number(currentPage + 1));
          break;
        default:
          emit("change", Number(argument));
          break;
      }
    }

    return { showPrevMore, showNextMore, pagers, handleChangePage };
  },
};
</script>

<style lang="css">
li {
  margin: 0 6px;
  @apply text-xs;
}
.pagination-btn {
  border-radius: 50%;
  line-height: 24px !important;
  @apply w-6 h-6 font-semibold text-center bg-gray-100 text-gray-600 cursor-pointer transition-all duration-100;
}
.pagination-btn.disabled {
  @apply cursor-not-allowed bg-gray-50 text-gray-300 hover:bg-gray-50 hover:text-gray-300;
}
.pagination-btn.active,
.pagination-btn:hover {
  @apply font-bold bg-primary text-white;
}
</style>
