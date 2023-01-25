<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import MyHeaders from '@/components/MyHeaders.vue'
import { useMenuStore, useLocalStore } from '@/store' // 菜单状态

const menuStatus = useMenuStore()
const localStore = useLocalStore()

</script>

<template>
  <el-config-provider :locale="localStore.lang">
    <div class="common-layout">

      <el-container class="container">

        <el-aside :class="[menuStatus.isCollapsed ? 'nav-collapsed' : 'nav-expanded']">
          <NavigationBar />
        </el-aside>

        <el-container>

          <el-header class="flex-row-ac">
            <MyHeaders/>
          </el-header>

          <el-main>
            <router-view></router-view>
          </el-main>

          <el-footer class="flex-row-ac">Footer</el-footer>

        </el-container>

      </el-container>

    </div>
  </el-config-provider>

</template>

<style scoped lang="scss">
.common-layout {
  width: 100vw;
  height: 100vh;

  .container{
    width: 100%;
    height: 100%;

    .nav-expanded{
      width: 200px;
    }

    .nav-collapsed{
      width: calc( var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2 );
    }
  }
}
</style>
