import MainLayout from '@/layouts/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/About.vue'),
        },
        {
          path: 'projects',
          name: 'projects',
          component: () => import('@/views/Projects.vue'),
        },
        {
          path: 'tenders',
          name: 'tenders',
          component: () => import('@/views/Tenders.vue'),
        },
        {
          path: 'schemes',
          name: 'schemes',
          component: () => import('@/views/Schemes.vue'),
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('@/views/News.vue'),
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: () => import('@/views/Notifications.vue'),
        },
        {
          path: 'gallery',
          name: 'gallery',
          component: () => import('@/views/Gallery.vue'),
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('@/views/Contact.vue'),
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
