<template>
  <section class="flex">
    <Sidebar />
    <div id="content" class="ml-44">
      <!-- <CascaderDemo /> -- -->
      <!-- <button @click="toggleShow">Click</button>
  <div v-loading="show">
    <span>Data</span>
  </div> -->
      <!-- <button @click="showMessageBox">Click</button>
      <br />
      <DemoVirtualList />
      <Icon :icon="['s', 'trash']" size="xs" class="text-blue-500" /> -->
      <!-- <button @click="hanldeClick">Click</button> -->
    </div>
    <!-- <Form /> -->

    <UploadDemo />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "./components/Sidebar/src/Index.vue";
import CascaderDemo from "./components/Cascader/demo.vue";
import MessageBox from "./components/MessageBox/src";
import testCom from "./components/test/test.vue";
import DemoVirtualList from "./components/VirtualList/Demo.vue";
import Icon from "./components/Icon/Index.vue";
import Form from "./components/test/form.vue";
import UploadDemo from "./components/UploadImage/Demo.vue";

const show = ref(false);

function toggleShow() {
  show.value = !show.value;
}
function showMessageBox() {
  MessageBox.show("Title", "message", {
    iconClass: "far fa-spinner-third fa-spin",
    onConfirm: (state, done) => {
      state.boxLoading = true;
      setTimeout(() => {
        // state.boxLoading = false;
        // done();
      }, 200);
    },
  });
}
function hanldeClick() {
  MessageBox.openDialog(testCom).then((res) => console.error(res));
}
</script>
