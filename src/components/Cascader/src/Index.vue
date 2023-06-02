<template>
  <div v-click-outside="close">
    <input type="text" @click="show = true" />

    <transition name="slide-down">
      <transition-group tag="div" name="list" v-show="show" class="list flex">
        <Container v-for="(menu, index) in menus" :key="index" :menu="menu">
        </Container>
      </transition-group>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Container from "./Container.vue";
import { Menu } from "./types";
import useCascader from "./useCascader";

const props = defineProps<{ options: Menu[]; modelValue: number[] }>();
const emit = defineEmits(["update:modelValue"]);

const { initData, menus, selectedIds } = useCascader();
initData(props.options, props.modelValue);

const show = ref<boolean>(false);

watch(selectedIds, (val) => {
  emit("update:modelValue", val);
});

function close() {
  show.value = false;
}
</script>

<script lang="ts">
export default {
  name: "Cascader",
  inheritAttrs: false,
};
</script>

<style scoped></style>
