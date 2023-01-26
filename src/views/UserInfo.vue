<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { ref } from 'vue'
import { Select } from '@element-plus/icons-vue'

const userStore = useUserStore()

const avatarSrc = ref(userStore.userAvatarSrc)

</script>

<template>
  <el-space wrap class="user-container">
    <el-card class="card">
      <img :src="userStore.userAvatarSrc" alt="none" class="image"/>
      <el-input v-model="avatarSrc">
        <template #append>
          <el-button @click="userStore.setUserAvatarSrc(avatarSrc)" :icon="Select" />
        </template>
      </el-input>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss">
.user-container {

  .card {

    .image {
      height: 100px;
      width: 100px;
    }
  }
}
</style>
