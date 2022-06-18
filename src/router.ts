/** @format */

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import auth from "./middleware/auth";
import guest from "./middleware/guest";

const routes: RouteRecordRaw[] = [
	{
		path: "/home",
		name: "home",
		component: () => import("./views/Home.vue"),
		beforeEnter: [auth],
	},
	{
		path: "/callback",
		name: "callback",
		component: () => import("./views/Callback.vue"),
		beforeEnter: [guest],
	},
	{
		path: "/login",
		name: "login",
		component: () => import("./views/Login.vue"),
		beforeEnter: [guest],
	},
	{
		path: "/projects",
		name: "projects",
		component: () => import("./views/Projects.vue"),
		beforeEnter: [auth],
	},
	{
		path: "/projects/:name",
		name: "projects-name",
		component: () => import("./views/Project.vue"),
		beforeEnter: [auth],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
