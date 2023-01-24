<script setup lang="ts">
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { useMenuStore, useThemeStore } from '@/store' // 菜单状态
import changeTheme from '@/utils/theme/changeTheme'
import { useUserStore } from '@/store/user'

const menuStatus = useMenuStore()
const themeStore = useThemeStore()
const userStore = useUserStore()

</script>

<template>
  <div class="flex-row-ac main-container">
    <div class="left">
      <div class="collapse">
        <el-button :icon="menuStatus.isCollapsed ? DArrowRight : DArrowLeft" @click="menuStatus.changeCollapse()"/>
      </div>

      <div class="breadcrumb">

      </div>
    </div>

    <div class="flex-row-ac right">
      <el-select class="theme" v-model="themeStore.currentThemeValue" placeholder="主题"
                 @change="changeTheme($event)">
        <el-option
            v-for="item in themeStore.themeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

      <el-avatar class="avatar" :src="userStore.userAvatarSrc" :size="28"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  width: 100%;
  height: 100%;
  justify-content: space-between;

  .left {
    .collapse {
      padding: 0 5px 0 0;
    }
  }

  .right {
    .theme {
      width: 100px;
    }

    .avatar{
      margin: 0 0 0 5px;
    }
  }
}
</style>
