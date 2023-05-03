<script setup lang="ts">
import { ref } from "vue";
import CascaderDemo from "./components/Cascader/demo.vue";
import MessageBox from "./components/MessageBox/src";
import testCom from "./components/test/test.vue";

const show = ref(false);

function toggleShow() {
  show.value = !show.value;
}
function showMessageBox() {
  MessageBox.show("Title", "message", {
    iconClass: "fas fa-trash",
    onConfirm: (state, done) => {
      // state.boxLoading = true;
      setTimeout(() => {
        state.boxLoading = false;
        // done();
      }, 200);
    },
  });
}
// function hanldeClick() {
//   MessageBox.openDialog(testCom).then((res) => console.error(res));
// }
</script>

<template>
  <!-- <CascaderDemo /> -- -->
  <!-- <button @click="toggleShow">Click</button>
  <div v-loading="show">
    <span>Data</span>
  </div> -->
  <button @click="showMessageBox">Click</button>
  <!-- <button @click="hanldeClick">Click</button> -->
</template>
