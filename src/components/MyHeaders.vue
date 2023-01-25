<script setup lang="ts">
import { useThemeStore } from '@/store' // 菜单状态
import changeTheme from '@/utils/theme/changeTheme'
import { useUserStore } from '@/store/user'
import { useRoute, useRouter } from 'vue-router'

import { CurrentTime } from '@/utils/time/CurrentTime'

const themeStore = useThemeStore()
const userStore = useUserStore()

const router = useRouter()
const route = useRoute()

const currentTime = new CurrentTime(new Date())

const goBack = () => {
  router.push({
    name: '首页',
    query: {
      ...route.query
    }
  })
}
</script>

<template>
  <div class="flex-row-ac main-container">
    <div class="left flex-row">

      <el-page-header @back="goBack">
        <template #content>
          <span class="text-large font-600 mr-3"> {{ route.name || '' }} </span>
        </template>
      </el-page-header>

      <div class="breadcrumb">

      </div>
    </div>

    <el-space wrap class="flex-row-ac right">
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

      <span
          class="time-text">{{ `${currentTime.formatterTime('MM')}月/${currentTime.formatterTime('dd')}日/${currentTime.getWeekDay()}` }}</span>
    </el-space>
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

    .avatar {
      margin: 0 0 0 5px;
    }

    .time-text {
      font-size: var(--el-font-size-small);
      color: var(--el-text-color-secondary);
    }
  }
}
</style>
