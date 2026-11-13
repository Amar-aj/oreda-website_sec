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
          path: 'leadership',
          name: 'leadership',
          component: () => import('@/views/Who.vue'),
        },
        {
          path: 'who-is-who',
          redirect: { name: 'leadership' },
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
          path: 'awards',
          name: 'awards',
          component: () => import('@/views/Awards.vue'),
        },
        {
          path: 'career',
          name: 'career',
          component: () => import('@/views/Career.vue'),
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('@/views/Contact.vue'),
        },
        {
          path: 'vendor-empanelment',
          name: 'vendor-empanelment',
          component: () => import('@/views/VendorEmpanelment.vue'),
        },
        {
          path: 'privacy',
          name: 'privacy',
          component: () => import('@/views/Privacy.vue'),
        },
        {
          path: 'terms',
          name: 'terms',
          component: () => import('@/views/Terms.vue'),
        },

      ],
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return new Promise((resolve) => {
        const tryScroll = (attempt = 0) => {
          const el = document.querySelector(to.hash)
          if (el) {
            resolve({
              el: to.hash,
              top: 112,
              behavior: 'smooth',
            })
            return
          }
          if (attempt >= 16) {
            resolve({ top: 0 })
            return
          }
          window.setTimeout(() => tryScroll(attempt + 1), 50)
        }
        window.setTimeout(() => tryScroll(), 80)
      })
    }

    return { top: 0 }
  },
})

export default router
