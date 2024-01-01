import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import clickOutside from "./directives/click-outside";
import loading from "./directives/loading/loading";
import clipboard from "./directives/clipboard";

const app = createApp(App);

app.directive("click-outside", clickOutside);
app.directive("loading", loading);
app.directive("clipboard", clipboard);

app.mount("#app");
