import { defineStore } from 'pinia'

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
        { routerPath: '/selectColor', menuName: '取色板', menuId: 'selectColor', icon: 'Edit', children: [] },
        // { routerPath: '/code', menuName: '二维码', menuId: 'code', icon: 'Edit', children: [] },
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
            }
            // { routerPath: '/theme', menuName: '主题', menuId: 'theme', icon: 'Setting', children: [] },
            // { routerPath: '/user', menuName: '个人信息', menuId: 'user', icon: 'Setting', children: [] }
          ]
        }
      ]// 菜单列表
    }
  },

  actions: {
    /**
         * 改变菜单折叠状态
         */
    changeCollapse (): void {
      this.isCollapsed = !this.isCollapsed
    },

    /**
         * 获取菜单
         */
    getMenuList (): any[] {
      return this.menuList
    },

    /**
         * 设置菜单
         * @param menuList 菜单
         */
    setMenuList (menuList: any[]): void {
      this.menuList = menuList
    }
  }
})
