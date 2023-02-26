<script setup lang="ts">
import {getActualWeather, getRecentWeather} from "@/api/weather";
import {reactive} from "vue";

interface day {
  text_day:string
}

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
    daily: [] as Array<day>,
    location: {
      name: ''
    }
  },
  refreshDisable: false,
  privateKey: '',
  publicKey: '',
  timeStamp: 0,
  ip: 'ip'
})

weatherState.timeStamp = new Date().getTime()
weatherState.publicKey = localStorage.getItem('weatherPublicKey') || weatherState.publicKey
weatherState.privateKey = localStorage.getItem('weatherPrivateKey') || weatherState.privateKey

/**
 * 获取天气数据
 */
const getData = () => {
  getActualWeather(weatherState.ip, weatherState.privateKey, weatherState.timeStamp, weatherState.publicKey).then((res) => {
    weatherState.data = res.data?.results[0]
  })
  getRecentWeather(weatherState.ip, weatherState.privateKey, weatherState.timeStamp, weatherState.publicKey).then((res) => {
    weatherState.recentData = res.data?.results[0]
  })
}

getData()

/**
 * 刷新数据
 */
const refresh = () => {
  weatherState.refreshDisable = true
  weatherState.timeStamp = new Date().getTime()
  getData()
  setTimeout(() => {
    weatherState.refreshDisable = false
  }, 3000)
}

</script>

<template>
  <div class="main-container">
    <el-button @click="refresh" icon="Refresh" :disabled="weatherState.refreshDisable" circle/>

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
