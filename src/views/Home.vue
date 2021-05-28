<template>
  <Pagination :current-page="page" :total-pages="10" @change="onChange" />
</template>

<script>
import { ref } from "vue";
import Pagination from "@/components/Pagination/Index.vue";

export default {
  name: "Home",
  components: {
    Pagination,
  },
  setup() {
    const page = ref(1);
    function onChange(e) {
      page.value = e;
      console.log(e);
    }

    return { page, onChange };
  },
};
</script>
