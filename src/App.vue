<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import MyHeaders from '@/components/MyHeaders.vue'
import { useMenuStore, useLocalStore } from '@/store' // 菜单状态

const menuStatus = useMenuStore()
const localStore = useLocalStore()

</script>

<template>
  <el-config-provider :locale="localStore.lang">

    <el-container class="common-layout-wrap">

      <el-aside :class="[menuStatus.isCollapsed ? 'nav-collapsed' : 'nav-expanded']">
        <NavigationBar/>
      </el-aside>

      <el-container>

        <el-header class="flex-row-ac header-container">
          <MyHeaders/>
        </el-header>

        <el-main style="background-color: var(--el-bg-color);">
          <router-view></router-view>
        </el-main>

        <el-footer class="flex-row-ac">Footer</el-footer>

      </el-container>

    </el-container>

  </el-config-provider>

</template>

<style scoped lang="scss">
.common-layout-wrap {
  width: 100vw;
  height: 100vh;

  .header-container {
    box-sizing: border-box;
    border-bottom: 1px solid var(--el-border-color);
  }

  .nav-expanded {
    width: 200px;
  }

  .nav-collapsed {
    width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
  }
}
</style>
