/**
 * @name: setup
 * @description：setup.js
 * @date: 2022/10/26 22:16
 * @author: yf_hu
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import pinia from "@/stores/pinia";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./lang";
import "lib-flexible";

import "./assets/styles/css/main.css";
import "./assets/styles/less/index.less";

// 引入组件
import("./components").then((e) => e.default(app));
// 加载插件
import("./plugins").then((e) => e.default(app));

const app = createApp(App);

app.use(createPinia()).use(router).use(pinia).use(i18n).mount("#app");
