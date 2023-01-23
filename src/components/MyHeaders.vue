<script setup lang="ts">
import {reactive, ref} from 'vue'
import {DArrowLeft, DArrowRight} from '@element-plus/icons-vue'
import {useMenuStore} from '@/store' // 菜单状态

const menuStatus = useMenuStore()

// 下拉框默认值
const currentTheme = ref('default')
const themeOptions = reactive([
  {value: 'default', label: '默认'},
  {value: 'red', label: '中国红'},
  {value: 'purple', label: '幽兰紫'},
  {value: 'dark', label: '暗黑'}
])

function changeTheme(event: string) {
  document.getElementsByTagName('html')[0].className = event
}

</script>

<template>
  <el-button :icon="menuStatus.isCollapsed ? DArrowRight : DArrowLeft" @click="menuStatus.changeCollapse()"/>

  <el-select v-model="currentTheme" placeholder="主题" @change="changeTheme">
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
