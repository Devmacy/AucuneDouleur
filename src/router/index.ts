import {createRouter, createWebHistory} from 'vue-router'

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
    },

    {
        path: '/saleRecord',
        name: '哇偶宠物店单据录入',
        component: async () => await import('@/views/SaleRecord.vue')
    },

    {
        path: '/mineSweeping',
        name: '扫雷',
        component: async () => await import('@/views/game/mineSweeping.vue')
    },

    {
        path: '/three',
        name: 'three',
        children: [
            {
                path: 'threeJs',
                name: 'threeJs',
                component: async () => await import('@/views/three/ThreeJs.vue')
            },
            {
                path: 'arrayCube',
                name: 'arrayCube',
                component: async () => await import('@/views/three/ArrayCube.vue')
            },
            {
                path: 'point',
                name: 'point',
                component: async () => await import('@/views/three/bufferGeometry/PointGeometry.vue')
            }
        ],
    },
]
export default createRouter({
    history: createWebHistory(),
    routes
})
