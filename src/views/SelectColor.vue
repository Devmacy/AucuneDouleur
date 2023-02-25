<script setup lang="ts">

import {reactive} from "vue";
import {getRandomNumberLR} from "@/utils/number/randomNumbe";
import {RGBAStrToList} from "@/utils/color";

const colorState = reactive({
  selectedColor: '',
  colorList: [] as Array<Array<string>>,
  listCount: 10,

  slideR: 0,
  slideG: 0,
  slideB: 0,
  slideA: 0
})


/**
 * 生成暖色或冷色或随机色
 * @param type 颜色类型
 * @param count 颜色数量
 */
const generateColorList = (type: string, count?: number): void => {
  for (let i = 0; i < (count ? count : 10); i++) {
    let r = `${getRandomNumberLR(0, 255)}`
    let b = `${getRandomNumberLR(0, 255)}`

    if (type === 'warm') {
      if (parseInt(r) < parseInt(b)) {
        [r, b] = [b, r]
      }
    }

    if (type === 'cold') {
      if (parseInt(r) > parseInt(b)) {
        [r, b] = [b, r]
      }
    }

    colorState.colorList.push([r, `${getRandomNumberLR(0, 255)}`, b, `1`])
  }
}

/**
 * 解析当前颜色并且设置当前颜色
 * @param rgbColorList
 */
const setCurrentColor = (rgbColorList: Array<string>): void => {
  const R = rgbColorList[0]
  const G = rgbColorList[1]
  const B = rgbColorList[2]
  const A = rgbColorList[3]
  colorState.slideR = parseInt(R)
  colorState.slideG = parseInt(G)
  colorState.slideB = parseInt(B)
  colorState.slideA = parseInt(A)
  colorState.selectedColor = `rgba(${R},${G},${B},${A})`
}

/**
 * 滑块change事件
 * @param value 值
 * @param type 滑块类型
 */
const slideChange = (value: number, type: string) => {
  type === 'R' ? colorState.slideR = value : ''
  type === 'G' ? colorState.slideG = value : ''
  type === 'B' ? colorState.slideB = value : ''
  type === 'A' ? colorState.slideA = value : ''
  colorState.selectedColor = `rgba(${colorState.slideR},${colorState.slideG},${colorState.slideB},${(colorState.slideA / 100).toFixed(2)})`
}

/**
 * 颜色选择器change事件
 * @param value
 */
const colorPickerChange = (value: string) => {
  const [slideR, slideG, slideB, slideA] = RGBAStrToList(value) as Array<string>
  colorState.slideR = parseInt(slideR)
  colorState.slideG = parseInt(slideG)
  colorState.slideB = parseInt(slideB)
  colorState.slideA = parseFloat(slideA) * 100
}

/**
 * 格式化滑块
 * @param val 值
 */
const formatAlpha = (val: number) => {
  return val / 100
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
          <el-color-picker show-alpha color-format="rgb" v-model="colorState.selectedColor"
                           @change="colorPickerChange"/>
        </template>
      </el-input>

      <div class="flex-row-ac">
        <div class="current-color-container">
          <div class="current-color" :style="{backgroundColor:colorState.selectedColor}"></div>
        </div>

        <div class="flex-col" style="flex: 1;padding: 0 10px 0  20px">
          <el-slider v-model="colorState.slideR" :max="255" @change="slideChange($event,'R')"/>
          <el-slider v-model="colorState.slideG" :max="255" @change="slideChange($event,'G')"/>
          <el-slider v-model="colorState.slideB" :max="255" @change="slideChange($event,'B')"/>
          <el-slider v-model="colorState.slideA" :max="100" :format-tooltip="formatAlpha"
                     @change="slideChange($event,'A')"/>
        </div>
      </div>

    </el-card>

    <el-card class="box-card">
      <template #header>
        <div>
          <el-button @click="generateColorList('',colorState.listCount)">随机颜色</el-button>
          <el-button @click="generateColorList('warm',colorState.listCount)">暖色</el-button>
          <el-button @click="generateColorList('cold',colorState.listCount)">冷色</el-button>
          <el-button @click="colorState.colorList = []">clear</el-button>
          <el-input-number v-model="colorState.listCount" :min="1" controls-position="right" :step="1" step-strictly/>
        </div>
      </template>

      <div class="flex-row random-color-container" style="flex-wrap: wrap">
        <div class="item" v-for="(item,index) in colorState.colorList" :key="index"
             :style="{backgroundColor:`rgba(${item[0]},${item[1]},${item[2]},${item[3]})`}"
             @click="setCurrentColor(item)"></div>
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
