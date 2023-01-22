import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menuStore', {
  state: () => {
    return {
      isCollapsed: false
    }
  },

  actions: {
    // 改变菜单折叠状态
    changeCollapse () {
      this.isCollapsed = !this.isCollapsed
    }
  }
})
