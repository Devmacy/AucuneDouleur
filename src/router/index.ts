import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: async () => await import('@/components/DashBoard.vue')
      }
    ]
  },

  {
    path: '/selectColor',
    name: 'selectColor',
    component: async () => await import('@/views/SelectColor.vue')
  },

  {
    path: '/international',
    name: 'international',
    component: async () => await import('@/views/LocalInternational.vue')
  }
]
export default createRouter({
  history: createWebHistory(),
  routes
})
