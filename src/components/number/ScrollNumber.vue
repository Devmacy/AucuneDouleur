<script setup lang="ts">
import {reactive} from "vue";
import {CaretTop, CaretBottom} from '@element-plus/icons-vue'

const emit = defineEmits(['getNumber'])

const numberState = reactive({
  integer: [0, 0, 0],
  decimal: [0, 0]
})

const init = () => {
  numberState.integer = [0, 0, 0]
  numberState.decimal = [0, 0]
}

const emitNumber = () => {
  const resultInteger = numberState.integer.reduce((pre, cur) => {
    pre = pre + cur
    return pre
  }, '')

  const resultDecimal = numberState.decimal.reduce((pre, cur) => {
    pre = pre + cur
    return pre
  }, '')

  const result = parseFloat(`${resultInteger}.${resultDecimal}`)

  emit('getNumber', {
    data: result
  })
}

const add = (index: number, pos: string) => {
  switch (pos) {
    case 'integer' :
      if (numberState.integer[index] === 9) {
        numberState.integer[index] = 0
      } else {
        numberState.integer[index]++
      }
      break;
    case 'decimal' :
      if (numberState.decimal[index] === 9) {
        numberState.decimal[index] = 0
      } else {
        numberState.decimal[index]++
      }
      break;
  }
  emitNumber()
}

const sub = (index: number, pos: string) => {
  switch (pos) {
    case 'integer' :
      if (numberState.integer[index] === 0) {
        numberState.integer[index] = 9
      } else {
        numberState.integer[index]--
      }
      break;
    case 'decimal' :
      if (numberState.decimal[index] === 0) {
        numberState.decimal[index] = 9
      } else {
        numberState.decimal[index]--
      }
      break;
  }

  emitNumber()
}

defineExpose({
  init
})

</script>

<template>
  <div class="flex-row-ac main-container">
    <div class="flex-row-ac">

      <div class="flex-col-c-c number-container" v-for="(i,index) in numberState.integer" :key="index">
        <el-button size="small" class="button-top" :icon="CaretTop" @click="add(index,'integer')"/>
        <el-input :model-value="i" readonly/>
        <el-button size="small" class="button-bottom" :icon="CaretBottom"
                   @click="sub(index,'integer')"/>
      </div>

      <div style="font-size: 40px">.</div>

      <div class="flex-col-c-c number-container" v-for="(i,index) in numberState.decimal" :key="index">
        <el-button size="small" class="button-top" :icon="CaretTop" @click="add(index,'decimal')"/>
        <el-input :model-value="i" readonly/>
        <el-button size="small" class="button-bottom" :icon="CaretBottom"
                   @click="sub(index,'decimal')"/>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  width: 100%;
  height: 100%;

  .number-container {
    width: 30px;
    margin: 0 5px;

    .button-top {
      width: 100%;
      margin: 0 0 2px 0
    }

    .button-bottom {
      width: 100%;
      margin: 2px 0 0 0
    }
  }
}
</style>
