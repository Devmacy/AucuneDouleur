<script setup lang="ts">
import { toggleDark } from '@/darkTheme'
import { reactive, ref } from 'vue'

const isNight = ref(false)

const currentTheme = ref('default')

const themeOptions = reactive([
  { value: 'default', label: '默认' },
  { value: 'red', label: '中国红' },
  { value: 'purple', label: '幽兰紫' }])

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
  <el-switch
      v-model="isNight"
      inline-prompt
      active-icon="Moon"
      inactive-icon="Sunny"
      @change="toggleDark"
  />

  <el-select v-model="currentTheme" placeholder="主题" @change="setTheme">
    <el-option
        v-for="item in themeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
</template>

<style scoped>
</style>
