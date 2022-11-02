import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import backpacks from '../views/backpacks.vue'
import store from '@/store'

const routes= [
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
    meta: { needsAuth: true },
    component: () => import('../views/basket.vue'),
  },
  {
    path: '/account',
    name: 'account',
    meta: { needsAuth: true },
    component: () => import('../views/account.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth) {
    if (store.state.auth.user) {
      next()
    } else {
      next('/')
    }
  }
  else {
    next()
  }
})

export default router
