import { createApp } from "vue";
import "../src/styles/index.scss";
import { createPinia } from "pinia";
import router from "./router";
import { listenReceiveMessage } from "@/utils/messageListener";
import App from "./App.vue";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
listenReceiveMessage();
