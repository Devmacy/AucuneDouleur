<script setup lang="ts">
import { reactive, ref } from 'vue'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'

// 菜单状态
import { useMenuStore } from '@/store'
const menuStatus = useMenuStore()
const currentTheme = ref('default')
const themeOptions = reactive([
  { value: 'default', label: '默认' },
  { value: 'red', label: '中国红' },
  { value: 'purple', label: '幽兰紫' },
  { value: 'dark', label: '暗黑' }
])

function setTheme (e) {
  loadStyles(`theme/${e}.css`)
}

function loadStyles (url) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
</script>

<template>
  <el-button :icon="menuStatus.isCollapsed ? DArrowRight : DArrowLeft" @click="menuStatus.changeCollapse()"/>

  <el-select v-model="currentTheme" placeholder="主题" @change="setTheme">
    <el-option
        v-for="item in themeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
</template>

<style scoped lang="scss">
</style>
