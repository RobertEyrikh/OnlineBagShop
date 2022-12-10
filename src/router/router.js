import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
    path: '/travelBagsCopy',
    name: 'travelBagsCopy',
    component: () => import('../views/travelBagsСopy.vue')
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
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/Services.vue')
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: () => import('../views/Delivery.vue')
  },
  {
    path: '/profile',
    name: 'AccountProfile',
    component: () => import('../views/Account/AccountProfile.vue')
  },
  {
    path: '/purchases',
    name: 'AccountPurchases',
    component: () => import('../views/Account/AccountPurchases.vue')
  },
  {
    path: '/wishlist',
    name: 'AccountWishlist',
    component: () => import('../views/Account/AccountWishlist.vue')
  },
  {
    path: '/feedback',
    name: 'AccountFeedback',
    component: () => import('../views/Account/AccountFeedback.vue')
  },
  {
    path: '/reviews',
    name: 'AccountReviews',
    component: () => import('../views/Account/AccountReviews.vue')
  },
  {
    path: '/questions',
    name: 'AccountQuestions',
    component: () => import('../views/Account/AccountQuestions.vue')
  },
  {
    path: '/:id',
    name: 'ThisItem',
    component: () => import('../views/ThisItem')
  },
  {
    path: '/adminPanel',
    name: 'AdminPanel',
    component: () => import('../views/AdminPanel')
  },
  {
    path: '/adminUsersList',
    name: 'AdminUsersList',
    component: () => import('../views/AdminPanel/AdminUsersList')
  },
  {
    path: '/adminItemsList',
    name: 'AdminItemsList',
    component: () => import('../views/AdminPanel/AdminItemsList')
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
