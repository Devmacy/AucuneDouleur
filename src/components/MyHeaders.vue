<script setup lang="ts">
import { toggleDark } from '@/darkTheme'
import { ref } from 'vue'

const isNight = ref(false)
</script>

<template>
  <el-switch
      v-model="isNight"
      inline-prompt
      active-icon="Sunny"
      inactive-icon="Moon"
      @change="toggleDark"
  />
</template>

<style scoped>
</style>
