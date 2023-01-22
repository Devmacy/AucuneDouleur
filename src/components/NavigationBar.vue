<script setup lang="ts">
</script>

<template>
  <el-menu :router="true">

    <el-menu-item index="/dashboard">
      <template #title>
        <el-icon>
          <House/>
        </el-icon>
        <span>首页</span>
      </template>
    </el-menu-item>

    <el-menu-item index="/selectColor">
      <template #title>
        <el-icon>
          <PieChart/>
        </el-icon>
        <span>取色板</span>
      </template>
    </el-menu-item>

    <el-menu-item index="3">
      <template #title>
        <el-icon>
          <FullScreen/>
        </el-icon>
        <span>二维码</span>
      </template>
    </el-menu-item>

    <el-menu-item index="4">
      <template #title>
        <el-icon>
          <Timer/>
        </el-icon>
        <span>时间处理</span>
      </template>
    </el-menu-item>

    <el-menu-item index="5">
      <template #title>
        <el-icon>
          <Setting/>
        </el-icon>
        <span>设置</span></template>
    </el-menu-item>

  </el-menu>
</template>

<style scoped>
</style>
