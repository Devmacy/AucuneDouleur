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
        name: '首页',
        component: async () => await import('@/components/DashBoard.vue')
      }
    ]
  },

  {
    path: '/selectColor',
    name: '取色板',
    component: async () => await import('@/views/SelectColor.vue')
  },

  {
    path: '/international',
    name: '国际化',
    component: async () => await import('@/views/LocalInternational.vue')
  },

  {
    path: '/user',
    name: '个人信息',
    component: async () => await import('@/views/UserInfo.vue')
  }
]
export default createRouter({
  history: createWebHistory(),
  routes
})
