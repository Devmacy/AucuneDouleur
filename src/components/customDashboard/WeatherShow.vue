<script setup lang="ts">
import {getActualWeather, getRecentWeather, getSign} from "@/api/weather";
import {reactive} from "vue";
import {useUserStore} from "@/store/user";

const userStore = useUserStore()

interface daily {
  date?: string
  text_day?: string
  code_day?: string
  text_night?: string
  code_night?: string
  hig?: string
  low?: string
  rainfall?: string
  precip?: string
  wind_direction?: string
  wind_direction_degree?: string
  wind_speed?: string
  wind_scale?: string
  humidity?: string
}

interface now {
  text?: string
  code?: string
  temperature?: string
}

interface location {
  id?: string
  name?: string
  country?: string
  path?: string
  timezone?: string
  timezone_offset?: string
}

interface actualRes {
  last_update?: string
  location?: location
  now?: now
}

interface recentRes {
  last_update?: string
  location?: location
  daily?: Array<daily>
}

const weatherState = reactive({
  actualData: {} as actualRes,

  recentData: {} as recentRes,
  refreshDisable: false,

  ip: 'ip'
})

/**
 * 获取天气数据
 */
const getData = () => {
  const timeStamp = new Date().getTime()
  getActualWeather(weatherState.ip, timeStamp).then((res: { data: { results: actualRes[] } }) => {
    weatherState.actualData = res.data.results[0]
  }).catch(()=>{
    userStore.setFirstTimeStamp(new Date().getTime())
    userStore.setSign(getSign())
  })

  getRecentWeather(weatherState.ip, timeStamp).then((res: { data: { results: recentRes[] } }) => {
    weatherState.recentData = res.data.results[0]
  }).catch(()=>{
    userStore.setFirstTimeStamp(new Date().getTime())
    userStore.setSign(getSign())
  })
}

// 设置第一次请求时间
if (!userStore.getFirstTimeStamp()) {
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
      <span>位置：{{ weatherState.actualData.location?.name }}</span>
      <span>温度：{{ weatherState.actualData.now?.temperature }}℃</span>
      <span>天气：{{ weatherState.actualData.now?.text }}</span>
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
