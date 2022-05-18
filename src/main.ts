/** @format */

import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './style sass/style.scss';


createApp(App).use(router).use(createPinia()).mount("#app");
