import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/leadership',
      name: 'leadership',
      component: () => import('../views/LeadershipView.vue'),
    },
    {
      path: '/working-groups',
      name: 'working-groups',
      component: () => import('../views/WorkingGroupsView.vue'),
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue'),
    },
    {
      path: '/donation',
      name: 'donation',
      component: () => import('../views/DonationView.vue'),
    },
  ],
})

export default router
