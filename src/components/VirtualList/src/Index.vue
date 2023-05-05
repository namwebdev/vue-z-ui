<template>
  <div>{{ items.length }}</div>

  <div v-bind="containerProps" style="height: 300px">
    <div v-bind="wrapperProps">
      <div v-for="{ data } in list" :key="data.index" style="height: 40px">
        Row: {{ data.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVirtualList, useInfiniteScroll } from "@vueuse/core";
import { ref } from "vue";

const props = defineProps<{ items: unknown[] }>();
const emit = defineEmits(["load-more"]);

const { list, containerProps, wrapperProps } = useVirtualList(props.items, {
  itemHeight: 40,
});

useInfiniteScroll(containerProps.ref, () => {
  emit("load-more");
});
</script>

<style scoped></style>
