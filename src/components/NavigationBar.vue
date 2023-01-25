<script setup lang="ts">
import { useMenuStore } from '@/store'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

// 菜单状态
const menuStatus = useMenuStore()
const menuList = menuStatus.menuList

function handleOpen () {

}
function handleClose () {

}
const route = useRoute()
</script>

<template>
  <el-menu :collapse-transition="false" :default-active="route.path" class="el-menu-container"
           :router="true" :collapse="menuStatus.isCollapsed" @open="handleOpen"
           @close="handleClose">

    <template v-for="(menu) in menuList" :key="menu.menuId">
      <!--  无子集    -->
      <el-menu-item v-if="menu?.children.length === 0" :index="menu.routerPath">
        <el-icon>
          <component :is="menu.icon"/>
        </el-icon>
        <template #title>
          <span>{{ menu.menuName || '' }}</span>
        </template>
      </el-menu-item>

      <!--  有子集    -->
      <el-sub-menu v-if="menu.children.length>0" :index="menu.routerPath">

        <template #title>
          <el-icon>
            <component :is="menu.icon"/>
          </el-icon>
          <span>{{ menu.menuName || '' }}</span>
        </template>

        <el-menu-item v-for="item in menu.children" :index="item.routerPath" :key="item.menuId">

          <template #title>
            <el-icon>
              <component :is="item.icon"/>
            </el-icon>
            <span>{{ item.menuName || '' }}</span>
          </template>
        </el-menu-item>

      </el-sub-menu>
    </template>

    <el-button class="collapse-container" :icon="menuStatus.isCollapsed ? DArrowRight : DArrowLeft" @click="menuStatus.changeCollapse()"/>
  </el-menu>

</template>

<style scoped lang="scss">
.el-menu-container {
  height: 100%;

  .collapse-container{
    border: none;
    margin-left: calc(var(--el-menu-base-level-padding) /2);
  }
}

.el-menu-container:not(.el-menu--collapse) {
  width: 100%;
  height: 100%;
}
</style>
