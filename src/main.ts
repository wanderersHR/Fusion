/** @format */

import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ClientOAuth2 from "client-oauth2";

createApp(App).use(router).use(createPinia()).mount("#app");


const github = new ClientOAuth2({
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  redirectUri: GITHUB_CLIENT_REDIRECT,
  accessTokenUri: "https://github.com/login/oauth/access_token",
  authorizationUri: "https://github.com/login/oauth/authorize",
  scopes: ["user:email"]
});

const getUrl = (url: string) => {
  const url = github.code.getUri();
  return response;
}

const getResponse = async (url: string) => {
  const response = await github.code.getToken(url);
  return response;
}