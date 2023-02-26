<script setup lang="ts">
import {useUserStore} from '@/store/user'
import {reactive, ref} from 'vue'
import {Select} from '@element-plus/icons-vue'

const userStore = useUserStore()

const avatarSrc = ref(userStore.userAvatarSrc)

const weatherState = reactive({
  publicKey: '',
  privateKey: ''
})

weatherState.publicKey = localStorage.getItem('weatherPublicKey') || weatherState.publicKey
weatherState.privateKey = localStorage.getItem('weatherPrivateKey') || weatherState.privateKey

/**
 * 保存密钥到本地
 * @param publicKey 公钥
 * @param privateKey 私钥
 */
const setLocalPrivateKey = (publicKey: string,privateKey:string) => {
  localStorage.setItem('weatherPublicKey', publicKey);
  localStorage.setItem('weatherPrivateKey', privateKey);
}

/**
 * 清除本地密钥
 */
const clearLocalPrivateKey = () => {
  weatherState.publicKey = weatherState.privateKey = ''
  localStorage.removeItem('weatherPublicKey');
  localStorage.removeItem('weatherPrivateKey');
}

</script>

<template>
  <el-space wrap class="user-container">
    <el-card class="card">
      <img :src="userStore.userAvatarSrc" alt="none" class="image"/>
      <el-input v-model="avatarSrc">
        <template #append>
          <el-button @click="userStore.setUserAvatarSrc(avatarSrc)" :icon="Select"/>
        </template>
      </el-input>
    </el-card>

    <el-card>
      <div>
        <el-input v-model="weatherState.publicKey" placeholder="心知天气公钥"/>
        <el-input v-model="weatherState.privateKey" placeholder="心知天气密钥"/>
        <el-button @click="setLocalPrivateKey(weatherState.publicKey,weatherState.privateKey)" icon="Download">
          保存密钥
        </el-button>
        <el-button @click="clearLocalPrivateKey" icon="Download">清除密钥</el-button>
      </div>
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
