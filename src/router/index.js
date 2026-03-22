import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/MainLayout.vue'),
      children: [
        { path: '/', name: 'home', component: () => import('@/pages/Home.vue') },
        { path: 'about', name: 'about', component: () => import('@/pages/About.vue') },
        { path: 'contact', name: 'contact', component: () => import('@/pages/Contact.vue') },

        // Work
        {
          path: 'work/education',
          name: 'work-education',
          component: () => import('@/pages/work/Education.vue'),
        },
        {
          path: 'work/experience',
          name: 'work-experience',
          component: () => import('@/pages/work/Experience.vue'),
        },
        {
          path: 'work/projects',
          name: 'work-projects',
          component: () => import('@/pages/work/Projects.vue'),
        },
        {
          path: 'work/tools',
          name: 'work-tools',
          component: () => import('@/pages/work/Tools.vue'),
        },
        { path: 'work/cv', name: 'work-cv', component: () => import('@/pages/work/CV.vue') },

        // Hobbies
        {
          path: 'hobbies/coins',
          name: 'hobbies-coins',
          component: () => import('@/pages/hobbies/Coins.vue'),
        },

        // 404 — must be last
        {
          path: ':pathMatch(.*)*',
          name: 'not-found',
          component: () => import('@/pages/NotFound.vue'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
