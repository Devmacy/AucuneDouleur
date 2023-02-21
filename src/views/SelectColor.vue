<script setup lang="ts">

import {reactive} from "vue";

const colorState = reactive({
  selectedColor: ''
})

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

    </el-card>

  </div>
</template>

<style scoped lang="scss">
.main-container {
  width: 100%;
  height: 100%;

  .box-card {
    width: 500px;
    height: 500px;
    box-sizing: border-box;

    .input-container {
      height: 30px;
    }
  }
}
</style>
