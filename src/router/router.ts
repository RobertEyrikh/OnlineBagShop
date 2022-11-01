import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import backpacks from '../views/backpacks.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/backpacks',
    name: 'backpacks',
    component: () => import('../views/backpacks.vue')
  },
  {
    path: '/belts',
    name: 'belts',
    component: () => import('../views/belts.vue')
  },
  {
    path: '/briefcases',
    name: 'briefcases',
    component: () => import('../views/briefcases.vue')
  },
  {
    path: '/travelBags',
    name: 'travelBags',
    component: () => import('../views/travelBags.vue')
  },
  {
    path: '/wallets',
    name: 'wallets',
    component: () => import('../views/wallets.vue')
  },
  {
    path: '/basket',
    name: 'basket',
    component: () => import('../views/basket.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
