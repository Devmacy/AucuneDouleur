import { defineStore } from 'pinia'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from 'element-plus/lib/locale/lang/en'
import jpLocale from 'element-plus/lib/locale/lang/ja'

const langMap = new Map()
langMap.set('zhCn', zhLocale)
langMap.set('en', enLocale)
langMap.set('jp', jpLocale)

export const useLocalStore = defineStore('localStore', {
  state: () => {
    return {
      currentLanguage: 'zhCn',
      lang: zhLocale,
      languageList: [{ label: '简体中文', value: 'zhCn' }, { label: '英文', value: 'en' }, {
        label: '日文',
        value: 'jp'
      }]
    }
  },

  actions: {
    /**
         * 获取当前语言
         */
    getLanguage (): string {
      return this.currentLanguage
    },

    /**
         * 设置当前语言
         * @param lang 语言
         */
    setLanguage (lang: string = 'zhCn') {
      if (lang === '' || langMap.get(lang) === undefined) {
        return
      }

      this.lang = langMap.get(lang)
      this.currentLanguage = lang
    }
  }
})
