/** @format */

import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(createPinia()).mount("#app");

const jiraData = {
	clientId: "o5OphqyH8bmxCcQqnaJvlZFslyyclMm7",
	clientSecret: "SYTQwcrq4w8P5dLl4ZxXybwGT2CmfN_SDv9DJK4FxJfsIxb7sw26PgBe1WrzHPim",
	redirectUri: "http://localhost:3000",
	state: "SYTQwcrq4w8P5dLl4ZxXybwGT2CmfN_SDv9DJK4FxJfsIxb7sw26PgBe1WrzHPim",
};

const jiraURL =
	"https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=o5OphqyH8bmxCcQqnaJvlZFslyyclMm7&scope=read%3Aproject.avatar%3Ajira%20read%3Aproject%3Ajira%20read%3Aissue%3Ajira-software%20read%3Aissue-type-hierarchy%3Ajira%20read%3Aissue-event%3Ajira&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&state=SYTQwcrq4w8P5dLl4ZxXybwGT2CmfN_SDv9DJK4FxJfsIxb7sw26PgBe1WrzHPim&response_type=code&prompt=consent";
