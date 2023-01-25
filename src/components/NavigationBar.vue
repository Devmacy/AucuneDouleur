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

    <div class="collapse-container">
      <el-button class="button" :icon="menuStatus.isCollapsed ? DArrowRight : DArrowLeft"
                 @click="menuStatus.changeCollapse()"><span v-if="!menuStatus.isCollapsed" class="text">收缩</span></el-button>
    </div>
  </el-menu>

</template>

<style scoped lang="scss">
.el-menu-container {
  height: 100%;

  .collapse-container {
    width: 100%;
    display: flex;
    justify-content: center;

    .button {
      height: var(--el-menu-item-height);
      width: calc(100% - var(--el-menu-base-level-padding) * 2);
      border: none;
    }
  }
}

.el-menu-container:not(.el-menu--collapse) {
  width: 100%;
  height: 100%;

  .collapse-container {
    width: 100%;
    display: flex;
    justify-content: center;

    .button {
      height: var(--el-menu-item-height);
      padding: 0 0 0 5px;
      justify-content: left;
      width: calc(100% - var(--el-menu-base-level-padding) * 2);

      .text{
        margin: 0 0 0 5px;
      }
    }
  }
}
</style>
