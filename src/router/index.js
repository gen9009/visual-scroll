import { createRouter, createWebHashHistory } from 'vue-router'
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/index.vue')
    },
    {
      path: '/demo-scrollTimeline',
      component: () => import('@/demo-scrollTimeline.vue')
    }
  ]
})
