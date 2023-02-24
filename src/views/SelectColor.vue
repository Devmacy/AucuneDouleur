<script setup lang="ts">

import {reactive} from "vue";
import {getRandomNumberLR} from "@/utils/number/randomNumbe";

const colorState = reactive({
  selectedColor: '',
  colorList: [] as Array<string>
})

/**
 * 生成随机颜色
 */
const generateRandomColorList = (): void => {
  for (let i = 0; i < 10; i++) {
    colorState.colorList.push(`rgba(${getRandomNumberLR(0, 255)},${getRandomNumberLR(0, 255)},${getRandomNumberLR(0, 255)},1)`)
  }
}

/**
 * 解析当前颜色并且设置当前颜色
 * @param rgbColor
 */
const setCurrentColor = (rgbColor: string): void => {
  colorState.selectedColor = rgbColor
}

</script>

<template>
  <div class="main-container">
    <el-card class="box-card">
      <template #header>
        <div>
          <span>颜色选择</span>
        </div>
      </template>

      <el-input v-model="colorState.selectedColor" class="input-container" style="height: 40px">

        <template #prepend>
          <span>当前颜色</span>
        </template>

        <template #append>
          <el-color-picker show-alpha color-format="rgb" v-model="colorState.selectedColor"/>
        </template>
      </el-input>

      <div class="current-color-container">
        <div class="current-color" :style="{backgroundColor:colorState.selectedColor}"></div>
      </div>

    </el-card>

    <el-card class="box-card">
      <template #header>
        <div>
          <el-button @click="generateRandomColorList">随机颜色</el-button>
          <el-button @click="generateRandomColorList">暖色</el-button>
          <el-button @click="generateRandomColorList">冷色</el-button>
          <el-button @click="colorState.colorList = []">clear</el-button>
        </div>
      </template>

      <div class="flex-row random-color-container" style="flex-wrap: wrap">
        <div class="item" v-for="(item,index) in colorState.colorList" :key="index"
             :style="{backgroundColor:item}" @click="setCurrentColor(item)"></div>
      </div>
    </el-card>

  </div>
</template>

<style scoped lang="scss">
.main-container {
  width: 100%;
  height: 100%;

  .box-card {
    width: 500px;
    box-sizing: border-box;

    .input-container {
      height: 30px;
    }

    .current-color-container {
      border: var(--el-border-color) solid 1px;
      border-radius: var(--el-border-radius-base);
      margin: 5px 0 0 0;
      width: 80px;
      height: 80px;
      box-sizing: border-box;
      padding: 5px;

      .current-color {
        height: 100%;
        width: 100%;
      }
    }

    .random-color-container {
      max-height: 300px;
      overflow: auto;
      scrollbar-width: none; /* firefox */

      .item {
        width: 20px;
        height: 20px;
        margin: 1px;
        box-sizing: border-box;
        cursor: pointer;
      }
    }

    .random-color-container::-webkit-scrollbar {
      display: none
    }
  }
}
</style>
