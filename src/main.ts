/** @format */

import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faJira } from "@fortawesome/free-brands-svg-icons";
import { faArrowRightFromBracket, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./style/style.scss";

library.add(faJira, faArrowRightFromBracket, faCircleUser);

createApp(App).use(router).use(createPinia()).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
