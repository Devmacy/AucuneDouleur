import { defineStore } from 'pinia'

export const useThemeStore = defineStore('themeStore', {
  state: () => {
    return {
      currentThemeValue: 'default', // 当前主题
      themeOptions: [
        { value: 'default', label: '默认蓝' },
        { value: 'red', label: '中国红' },
        { value: 'purple', label: '幽兰紫' },
        { value: 'dark', label: '典雅黑' }
      ] // 颜色选项
    }
  },

  actions: {}
})
