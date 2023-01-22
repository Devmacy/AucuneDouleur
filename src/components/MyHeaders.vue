<script setup lang="ts">
import { toggleDark } from '@/darkTheme'
import { ref } from 'vue'

const isNight = ref(false)

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

  <el-button @click="loadStyles('test.css')">change</el-button>
</template>

<style scoped>
</style>
