<script setup lang="ts">
import {getActualWeather, getRecentWeather} from "@/api/weather";
import {reactive} from "vue";

const weatherState = reactive({
  data: {
    now: {
      text: '',
      temperature: ''
    },
    location: {
      name: ''
    }
  },

  recentData: {
    daily: [],
    location: {
      name: ''
    }
  },
  refreshDisable: false,
  privateKey: ''
})

weatherState.privateKey = localStorage.getItem('weatherPrivateKey') || weatherState.privateKey

/**
 * 获取天气数据
 */
const getData = () => {
  getActualWeather('ip', weatherState.privateKey).then((res) => {
    weatherState.data = res.data?.results[0]
  })
}

/**
 * 获取天气数据
 */
const getRecentData = () => {
  getRecentWeather('ip', weatherState.privateKey).then((res) => {
    weatherState.recentData = res.data?.results[0]
  })
}

getData()
getRecentData()

/**
 * 刷新数据
 */
const refresh = () => {
  weatherState.refreshDisable = true
  getData()
  setTimeout(() => {
    weatherState.refreshDisable = false
  }, 3000)
}


/**
 * 保存密钥到本地
 * @param value 密钥
 */
const setLocalPrivateKey = (value: string) => {
  localStorage.setItem('weatherPrivateKey', value);
}

/**
 * 清除本地密钥
 */
const clearLocalPrivateKey = () => {
  weatherState.privateKey = ''
  localStorage.removeItem('weatherPrivateKey');
}

</script>

<template>
  <div class="main-container">
    <el-input v-model="weatherState.privateKey" placeholder="心知天气密钥">
      <template #append>
        <el-button @click="refresh" icon="Refresh" :disabled="weatherState.refreshDisable" circle/>
      </template>
    </el-input>
    <el-button @click="setLocalPrivateKey(weatherState.privateKey)" icon="Download">保存密钥到本地</el-button>
    <el-button @click="clearLocalPrivateKey" icon="Download">清除密钥</el-button>
    <div class="flex-col">
      <span>位置：{{ weatherState.data.location.name }}</span>
      <span>温度：{{ weatherState.data.now.temperature }}℃</span>
      <span>天气：{{ weatherState.data.now.text }}</span>
    </div>

    <div class="recent-container">
      <div class="recent-item" v-for="(item,index) in weatherState.recentData.daily" :key="index">
        {{ item.text_day || '' }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  width: 100%;
  height: 100%;

  .recent-container {
    display: flex;
    justify-content: space-around;

    .recent-item {
      height: 100px;
      width: 200px;
      border-radius: 10px;
      box-sizing: border-box;
      border: var(--el-border-color) solid 1px;
      margin: 0 5px;
    }
  }
}
</style>
