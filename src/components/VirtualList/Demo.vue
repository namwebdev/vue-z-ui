<template>
  <div>
    <div v-if="loading">Loading</div>
    <div v-else>
      <div>{{ data.length }}</div>
      <div v-bind="containerProps" style="height: calc(100vh - 120px)">
        <div v-bind="wrapperProps">
          <div
            v-for="{ data } in list"
            :key="(data as any).index"
            :style="{ height: `${itemHeight}px` }"
          >
            Row: {{ (data as any).title }}
          </div>
        </div>
      </div>

      <div v-show="isLoadMore">Load more</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { readonly, ref } from "vue";
import { useVirtualList, useInfiniteScroll } from "@vueuse/core";

const url = "http://localhost:5000/api/v1/shots";

const data = ref([]);
const itemHeight = ref<number>(100);
const loading = ref(true);
const isLoadMore = ref(false);
const page = ref(1);

const { list, containerProps, wrapperProps } = useVirtualList(data, {
  itemHeight: itemHeight.value,
});

const load = () => {
  fetch(`${url}?page=${page.value}`)
    .then((res) => res.json())
    .then((res) => {
      data.value = data.value.concat(res.data);
      loading.value = false;
      isLoadMore.value = false;
    });
};

load();

const loadMore = () => {
  isLoadMore.value = true;
  page.value++;
  load();
};
useInfiniteScroll(containerProps.ref, loadMore);
</script>

<script lang="ts">
export default {
  name: "DemoVirtualList",
  inheritAttrs: false,
};
</script>

<style scoped></style>
