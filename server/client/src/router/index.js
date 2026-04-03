import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
    },
    {
      path: '/about/leadership',
      name: 'leadership',
      component: () => import('../views/Leadership.vue'),
    },
    {
      path: '/working-groups',
      name: 'working-groups',
      component: () => import('../views/WorkingGroups.vue'),
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/Calendar.vue'),
    },
    {
      path: '/donation',
      name: 'donation',
      component: () => import('../views/Donation.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/Blog.vue'),
    },
  ],
})

export default router
