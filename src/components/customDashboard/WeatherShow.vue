<script setup lang="ts">
import {getActualWeather, getRecentWeather, getSign} from "@/api/weather";
import {reactive} from "vue";
import {useUserStore} from "@/store/user";

const userStore = useUserStore()

interface day {
  text_day: string
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

  ip: 'ip'
})

/**
 * 获取天气数据
 */
const getData = () => {
  const timeStamp = new Date().getTime()
  getActualWeather(weatherState.ip, timeStamp).then((res: any) => {
    weatherState.data = res.data?.results[0]
  })
  getRecentWeather(weatherState.ip, timeStamp).then((res: any) => {
    weatherState.recentData = res.data?.results[0]
  })
}

// 设置第一次请求时间
if(!userStore.getFirstTimeStamp()){
  userStore.setFirstTimeStamp(new Date().getTime())
  userStore.setSign(getSign())
}
getData()

/**
 * 刷新数据
 */
const refresh = () => {
  weatherState.refreshDisable = true
  getData()
  setTimeout(() => {
    weatherState.refreshDisable = false
  }, 1000)
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
