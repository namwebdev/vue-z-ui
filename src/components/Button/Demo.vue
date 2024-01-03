<template>
  <div class="my-10">
    <div class="mb-5">
      Basic:
      <div>
        <Button> Basic button </Button>
      </div>
    </div>

    <div class="mb-5">
      Intent:
      <div>
        <Button> Primary </Button>
        <Button intent="secondary"> Secondary </Button>
      </div>
    </div>

    <div class="mb-5">
      Size:
      <div>
        <Button> Default </Button>
        <Button size="small"> Small </Button>
      </div>
    </div>

    <div class="mb-5">
      Loading:
      <div>
        <Button
          size="small"
          intent="secondary"
          @click="handleClick"
          class="mb-2"
        >
          Toggle loading
        </Button>
        <div>
          <Button :loading="loading">Click me</Button>
        </div>
        <div class="flex">
          <span> With directive <b> loading</b></span>
          <Button v-loading="loading">test</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "./src/Index.vue";

const loading = ref(false);
function handleClick() {
  loading.value = !loading.value;
  console.log(loading.value);
}
</script>

<style scoped></style>
