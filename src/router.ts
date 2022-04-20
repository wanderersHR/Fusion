/** @format */

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./views/Home.vue";
import Callback from "./views/Callback.vue";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/callback",
		name: "callback",
		component: Callback,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
