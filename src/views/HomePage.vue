<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import MyHeaders from '@/components/MyHeaders.vue'
</script>

<template>
  <MyHeaders style="width: 100vw;background: aqua"/>
  <div style="display: flex;">
    <el-row>
      <el-col span="8">
        <NavigationBar style="background: dodgerblue;width: 100%"/>
      </el-col>

      <el-col span="16">
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
</style>
