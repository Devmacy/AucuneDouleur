<script setup lang="ts">
import WeatherShow from "@/components/customDashboard/WeatherShow.vue";
</script>

<template>
  <div class="main-wrapper" id="main-wrapper">
    <el-card class="weather-container">
      <weather-show/>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.main-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;

  .weather-container {
    height: 300px;
    width: 400px;
  }
}

/* 滚动条整体 */
.main-wrapper::-webkit-scrollbar {
  display: none;
}

</style>
