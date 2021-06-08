<template>
  <div class="max-w-xl mx-auto">
    <Pagination :current-page="page" :total-pages="15" @change="onChange" />
    <!-- Modal -->
    <div>
      <button @click="visible = true">Open modal</button>
      <Modal v-model:visible="visible">
        <template #body>
          <button @click="showNotify">Notify</button>
        </template>
      </Modal>
    </div>

    <!-- Dropdown  -->
    <Dropdown>
      <template #header> ZynKy </template>
      <DropdownItem v-for="item in dropdown" :key="item.id">
        {{ item.text }}
      </DropdownItem>
    </Dropdown>

    <!-- Select -->
    <Select
      v-model:value="value"
      :options="dropdown"
      :loading="selectData.search.loading"
      :isShowNoMore="selectData.noMoreResult"
      isSearch
      multiple
      @input="handleSearch"
    />

    <span class="pl-4">{{ value }}</span>
  </div>
</template>

<script>
import { ref, reactive, inject, onMounted, onBeforeUnmount } from "vue";
import Pagination from "@/components/Pagination/Index.vue";
import Modal from "@/components/Modal/Index.vue";
import Dropdown from "@/components/Dropdown/Index.vue";
import DropdownItem from "@/components/Dropdown/Item.vue";
import Select from "@/components/Select/Index.vue";

export default {
  name: "Home",
  components: {
    Pagination,
    Modal,
    Dropdown,
    DropdownItem,
    Select,
  },

  setup() {
    const event = inject("event");

    const page = ref(1);
    const visible = ref(false);
    const value = ref("");
    const dropdown = ref([
      { id: 1, text: "One" },
      { id: 2, text: "Two" },
      { id: 3, text: "Three" },
      { id: 4, text: "123" },
      { id: 5, text: "qwe" },
      { id: 6, text: "asd" },
      { id: 7, text: "yu" },
      { id: 8, text: "rty" },
      { id: 9, text: "nvbn" },
      { id: 10, text: "oip", disabled: true },
    ]);
    const selectPage = ref(1);
    const loadMore = ref(false);
    const selectData = reactive({
      noMoreResult: false,
      search: {
        text: "",
        debounce: null,
        loading: false,
        timeOut: 1000,
      },
    });

    onMounted(() => {
      const listElm = document.querySelector("#select-list");
      listElm.addEventListener("scroll", () => {
        if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight)
          loadMoreHandler();
      });
    });
    onBeforeUnmount(() => {
      const listElm = document.querySelector("#select-list");
      listElm.removeEventListener("scroll", () => {
        if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight)
          loadMore();
      });
    });

    function onChange(e) {
      page.value = e;
    }
    function showNotify() {
      event.emit("notify", { type: "success" });
    }
    function loadMoreHandler() {
      loadMore.value = true;
      try {
        if (selectPage.value === 4) {
          selectData.noMoreResult = true;
          return;
        }
        selectPage.value += 1;
        const nextItems = selectPage.value * 10;
        const newList = [];
        for (let i = nextItems; i <= nextItems + 10; i++)
          newList.push({ id: i, text: `Item ${i}` });
        dropdown.value = [...dropdown.value, ...newList];
      } catch (e) {
        event.emit("notify", { type: "error", message: e });
      } finally {
        loadMore.value = false;
      }
    }
    function handleSearch(keyword) {
      selectData.search.loading = true;
      clearTimeout(selectData.search.debounce);
      selectData.search.debounce = setTimeout(() => {
        selectPage.value = 1;
        selectData.search.text = keyword;
        selectData.search.loading = false;
      }, selectData.search.timeOut);
    }

    return {
      page,
      visible,
      value,
      selectPage,
      loadMore,
      onChange,
      showNotify,
      dropdown,
      selectData,
      handleSearch,
    };
  },
};
</script>
