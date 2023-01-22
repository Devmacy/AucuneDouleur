<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import MyHeaders from '@/components/MyHeaders.vue'
</script>

<template>
  <div class="common-layout">

    <el-container class="container">

      <el-aside class="nav-container">
        <NavigationBar />
      </el-aside>

      <el-container>

        <el-header>
          <MyHeaders/>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>

        <el-footer>Footer</el-footer>

      </el-container>

    </el-container>

  </div>

</template>

<style scoped lang="scss">
.common-layout {
  width: 100vw;
  height: 100vh;

  .container{
    width: 100%;
    height: 100%;
  }
}
</style>
