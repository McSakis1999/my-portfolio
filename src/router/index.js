import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'

// Layout
import MainLayout from '@/layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // External Pages
    {
      path: '/',
      component: MainLayout, // Use the layout for the root route
      children: [
        {
          path: '/',
          component: Home,
          meta: {},
        },
      ],
    },
  ],
})

export default router
