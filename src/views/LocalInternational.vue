<script setup lang="ts">
import { useLocalStore } from '@/store'

const localStore = useLocalStore()
</script>

<template>
  <el-form label-width="200px">
    <el-form-item label="设置ElementPlus语言">
      <el-select v-model="localStore.currentLanguage" @change="localStore.setLanguage($event)">
        <el-option
            v-for="item in localStore.languageList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
</style>
