<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import MyHeaders from '@/components/MyHeaders.vue'

// 菜单状态
import { useMenuStore } from '@/store'
const menuStatus = useMenuStore()
</script>

<template>
  <div class="common-layout">

    <el-container class="container">

      <el-aside class="nav-container" :class="[menuStatus.isCollapsed ? 'nav-container-collapsed' : 'nav-container-expanded']">
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

    .nav-container-collapsed{
      width: calc( var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2 );
    }

    .nav-container-expanded{
    }

  }
}
</style>
