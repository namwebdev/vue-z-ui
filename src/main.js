import { createApp } from "vue";
import mitt from "mitt";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/css/index.css";
import "./assets/tailwind.css";
import ClickOutsideDirective from "@/directives/click-outside.js";

const app = createApp(App);
app.use(store);
app.use(router);
app.provide("event", mitt());
app.config.globalProperties.$event = mitt();
app.directive("click-outside", ClickOutsideDirective);

app.mount("#app");
