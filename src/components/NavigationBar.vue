<script setup lang="ts">
import { useMenuStore } from '@/store'
import { reactive } from 'vue'
// 菜单状态

const menuStatus = useMenuStore()

const menuList = reactive([
  {
    routerPath: 'dashboard',
    menuName: '首页',
    menuId: '1',
    icon: 'House',
    children: [{ routerPath: 'setting', menuName: '设置', menuId: '1-1', icon: 'Setting', children: [] }]
  },
  { routerPath: 'selectColor', menuName: '取色板', menuId: '2', icon: 'Edit', children: [] },
  { routerPath: 'code', menuName: '二维码', menuId: '3', icon: 'Edit', children: [] },
  { routerPath: 'time', menuName: '时间处理', menuId: '4', icon: 'Edit', children: [] },
  { routerPath: 'setting', menuName: '设置', menuId: '5', icon: 'Setting', children: [] }
])

function handleOpen () {

}
function handleClose () {

}

</script>

<template>
  <el-menu :collapse-transition="false" default-active="dashboard" class="el-menu-container"
           :router="true" :collapse="menuStatus.isCollapsed" @open="handleOpen"
           @close="handleClose">

    <div v-for="(menu) in menuList" :key="menu.menuId">
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
          <el-icon>
            <component :is="item.icon"/>
          </el-icon>
          <template #title>
            <span>{{ item.menuName || '' }}</span>
          </template>
        </el-menu-item>

      </el-sub-menu>
    </div>

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
