import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      userAvatarSrc: 'https://s1.ax1x.com/2023/01/24/pSYhwB4.jpg' // 用户头像地址
    }
  },

  actions: {
    /**
     * 获取用户头像地址
     */
    getUserAvatarSrc (): string {
      return this.userAvatarSrc
    },

    /**
     * 设置用户头像
     * @param src 用户头像地址
     */
    setUserAvatarSrc (src: string): void {
      this.userAvatarSrc = src
    }
  }
})
