import {defineStore} from 'pinia'

export const useMenuStore = defineStore('menuStore', {
    state: () => {
        return {
            isCollapsed: false, // 折叠状态
            menuList: [
                {
                    routerPath: '/dashboard',
                    menuName: '首页',
                    menuId: 'dashboard',
                    icon: 'House',
                    children: []
                },
                {routerPath: '/selectColor', menuName: '取色板', menuId: 'selectColor', icon: 'Edit', children: []},
                {
                    routerPath: '/saleRecord',
                    menuName: '哇偶宠物店单据录入',
                    menuId: 'saleRecord',
                    icon: 'Edit',
                    children: []
                },
                {routerPath: '/mineSweeping', menuName: '扫雷', menuId: 'mineSweeping', icon: 'Flag', children: []},
                {
                    routerPath: '/three', menuName: 'three', menuId: 'three', icon: 'Setting', children: [
                        {
                            routerPath: '/three/threeJs',
                            menuName: '场景',
                            menuId: 'threeJs',
                            icon: 'Bowl',
                            children: []
                        },
                        {
                            routerPath: '/three/arrayCube',
                            menuName: '阵列立方体',
                            menuId: 'arrayCube',
                            icon: 'Bowl',
                            children: []
                        },
                        {
                            routerPath: '/three/generalGeometry',
                            menuName: '基础模型',
                            menuId: 'FDB9FF89-0536-83DE-445A-D502F23DC464',
                            icon: 'Bowl',
                            children: []
                        },
                        {
                            routerPath: '/three/object3D',
                            menuName: '基础对象',
                            menuId: '979FB34D-B073-5B0C-3906-FA21E1FC290B',
                            icon: 'Bowl',
                            children: []
                        },
                    ]
                },
                // { routerPath: '/time', menuName: '时间处理', menuId: 'time', icon: 'Edit', children: [] },
                {
                    routerPath: '/setting',
                    menuName: '设置',
                    menuId: 'setting',
                    icon: 'Setting',
                    children: [
                        {
                            routerPath: '/international',
                            menuName: '国际化',
                            menuId: 'international',
                            icon: 'Bowl',
                            children: []
                        },
                        // { routerPath: '/theme', menuName: '主题', menuId: 'theme', icon: 'Setting', children: [] },
                        {routerPath: '/user', menuName: '个人信息', menuId: 'user', icon: 'User', children: []}
                    ]
                }
            ]// 菜单列表
        }
    },

    actions: {
        /**
         * 改变菜单折叠状态
         */
        changeCollapse(): void {
            this.isCollapsed = !this.isCollapsed
        },

        /**
         * 获取菜单
         */
        getMenuList(): any[] {
            return this.menuList
        },

        /**
         * 设置菜单
         * @param menuList 菜单
         */
        setMenuList(menuList: any[]): void {
            this.menuList = menuList
        }
    }
})
