<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import MyHeaders from '@/components/MyHeaders.vue'
</script>

<template>
  <MyHeaders/>
  <div style="display: flex;justify-content: left">
    <NavigationBar/>

    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">

</style>
