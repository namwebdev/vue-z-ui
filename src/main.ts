import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import clickOutside from "./directives/click-outside";

const app = createApp(App);

app.directive("click-outside", clickOutside);

app.mount("#app");
