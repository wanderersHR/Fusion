/** @format */

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./views/Home.vue";
import Callback from "./views/Callback.vue";
import Login from "./views/Login.vue";
import Protected from "./views/Protected.vue";
import auth from "./middleware/auth";
import guest from "./middleware/guest";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "home",
		component: Home,
		beforeEnter: [auth],
	},
	{
		path: "/callback",
		name: "callback",
		component: Callback,
		beforeEnter: [guest],
	},
	{
		path: "/login",
		name: "login",
		component: Login,
		beforeEnter: [guest],
	},
	{
		path: "/protected",
		name: "protected",
		component: Protected,
		beforeEnter: [auth],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
