<script setup lang="ts">
import WeatherShow from "@/components/customDashboard/WeatherShow.vue";
import Sortable from 'sortablejs'
import {onMounted} from "vue";

onMounted(() => {
  const container = document.getElementById('main-wrapper') as HTMLElement
  Sortable.create(container, {
    animation: 180,
    delay: 10,
  })
})

const bodyStyle = {
  "padding":0
}
</script>

<template>
  <div class="main-wrapper" id="main-wrapper">

    <el-card class="item" shadow="hover" :body-style="bodyStyle" v-for="i in 13" :key="i">
      <weather-show/>
    </el-card>

  </div>
</template>

<style scoped lang="scss">
.main-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;

  .item {
    width: 500px;
    height: 280px;
    padding: 0;
  }
}

/* 滚动条整体 */
.main-wrapper::-webkit-scrollbar {
  display: none;
}

</style>
