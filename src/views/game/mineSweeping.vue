<script setup lang="ts">

import {reactive} from "vue";
import {Cell} from "@/types/interface/mineSweeping";

const mineState = reactive({
  cellList: [] as Array<Cell>
})

/**
 * 初始化方法
 */
const init = () => {
  generateCell(8, 8)
}

/**
 * 产生格子的方法
 * @param height
 * @param width
 */
const generateCell = (height: number, width: number) => {
  console.log(height, width)
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      console.log(i, j)
    }
  }
}

init()
</script>

<template>
  扫雷
</template>

<style scoped lang="scss">
</style>
