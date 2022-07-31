import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'Apps' },
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: 'apps',
          name: 'Apps',
          component: () => import('@/views/apps/index.vue')
        },
        {
          path: '/apps/video-transform',
          name: 'VideoTransformDemo',
          component: () => import('@/views/apps/video-transform-demo/index.vue')
        },
        {
          path: ':any(.*)',
          name: '404',
          component: () => import('@/views/error/404.vue')
        }
      ]
    }
  ]
})

export default router
