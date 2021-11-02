import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Posts.vue')
  },
  {
    path: '/register',
    name: "Register",
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/trade',
    name: "Trade",
    component: () => import('../views/Trade.vue')
  },
  {
    path: '/puzzle',
    name: "Puzzle",
    component: () => import('../views/Items.vue')
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('../views/Inventory.vue')
  },
  {
    path: '/account',
    name: 'AccountDetails',
    component: () => import('../views/AccountDetails.vue')
  },
  {
    path: '/post/:query',
    name: 'PostFilter',
    component: () => import('../views/PostFiltered.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
