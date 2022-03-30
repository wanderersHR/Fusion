import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/Home.vue';

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Home
  },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })
  
export default router