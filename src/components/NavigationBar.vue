<script setup lang="ts">
import { useMenuStore } from '@/store'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

// 菜单状态
const menuStatus = useMenuStore()
const menuList = menuStatus.menuList

const route = useRoute()
</script>

<template>
  <div class="el-menu-container">

    <div class="menu-container">
      <el-menu :collapse-transition="false" :default-active="route.path"
               :router="true" :collapse="menuStatus.isCollapsed" class="menu">

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
      </el-menu>
    </div>

    <div class="collapse-container">
      <el-button class="button" :icon="menuStatus.isCollapsed ? DArrowRight : DArrowLeft"
                 @click="menuStatus.changeCollapse()"><span v-if="!menuStatus.isCollapsed" class="text">收缩</span>
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-menu-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .menu-container {
    overflow: auto;
    flex:1;

    .menu{
      height: 100%;
      width: 100%;
    }
  }

  .menu-container::-webkit-scrollbar {
    display: none;
  }

  .collapse-container {
    width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    border-right: solid 1px var(--el-menu-border-color);

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

  .menu-container {
    overflow: auto;
  }

  .menu-container::-webkit-scrollbar {
    display: none;
  }

  .collapse-container {
    width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    border-right: solid 1px var(--el-menu-border-color);

    .button {
      height: var(--el-menu-item-height);
      padding: 0 0 0 5px;
      justify-content: left;
      width: calc(100% - var(--el-menu-base-level-padding) * 2);

      .text {
        margin: 0 0 0 5px;
      }
    }
  }
}
</style>
