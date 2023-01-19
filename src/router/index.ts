import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    name: 'homePage',
    component: async () => await import('@/views/homePage.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: async () => await import('@/components/DashBoard.vue')
      }
    ]
  }
]
export default createRouter({
  history: createWebHistory(),
  routes
})
