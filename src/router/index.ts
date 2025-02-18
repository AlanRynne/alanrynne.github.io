import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '@/views/ContactView.vue'
import ComingSoon from '@/views/ComingSoon.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'coming-soon',
      component: ComingSoon,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { wideLayout: false },
    },
    {
      path: '/about',
      name: 'about',
      component: async () => import('../views/AboutView.vue'),
      meta: { wideLayout: true },
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: { wideLayout: true },
    },
  ],
})

export default router
