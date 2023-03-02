import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        viteCompression({
            threshold: 1024 // 对大于 100kb 的文件进行压缩
        })
    ],

    //  配置别名
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
})
