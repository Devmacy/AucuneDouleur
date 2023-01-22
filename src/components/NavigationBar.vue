<script setup lang="ts">
</script>

<template>
  <el-menu>

    <el-menu-item index="1">首页1</el-menu-item>

    <el-menu-item index="2">功能2</el-menu-item>

    <el-sub-menu index="3">
      <template #title>功能3</template>
      <el-menu-item index="3-1">1</el-menu-item>
      <el-menu-item index="3-2">2</el-menu-item>
      <el-menu-item index="3-3">3</el-menu-item>
    </el-sub-menu>

    <el-menu-item index="4">功能4</el-menu-item>

    <el-menu-item index="5">功能5</el-menu-item>
  </el-menu>
</template>

<style scoped>
</style>
