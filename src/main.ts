import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/element/index.scss'
import ElementPlus from 'element-plus'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

const pinia = createPinia()
const app = createApp(App)

// 全局注册elementIcon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(pinia).use(ElementPlus).mount('#app')
