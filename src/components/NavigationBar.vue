<script setup lang="ts">
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'

// 菜单状态
import { useMenuStore } from '@/store'
const menuStatus = useMenuStore()

</script>

<template>
  <el-menu class="el-menu-container" :router="true" :collapse="menuStatus.isCollapsed">

    <el-button :icon="menuStatus.isCollapsed ? DArrowRight : DArrowLeft" @click="menuStatus.changeCollapse()"/>

    <el-menu-item index="dashboard">
      <el-icon>
        <House/>
      </el-icon>
      <template #title>
        <span>首页</span>
      </template>
    </el-menu-item>

    <el-menu-item index="selectColor">
      <el-icon>
        <PieChart/>
      </el-icon>
      <template #title>
        <span>取色板</span>
      </template>
    </el-menu-item>

    <el-menu-item index="3">
      <el-icon>
        <FullScreen/>
      </el-icon>
      <template #title>
        <span>二维码</span>
      </template>
    </el-menu-item>

    <el-menu-item index="4">
      <el-icon>
        <Timer/>
      </el-icon>
      <template #title>
        <span>时间处理</span>
      </template>
    </el-menu-item>

    <el-menu-item index="5">
      <el-icon>
        <Setting/>
      </el-icon>
      <template #title>
        <span>设置</span></template>
    </el-menu-item>

  </el-menu>
</template>

<style scoped lang="scss">
.el-menu-container {
  height: 100%;
}

.el-menu-container:not(.el-menu--collapse) {
  width: 100%;
  height: 100%;
}
</style>
