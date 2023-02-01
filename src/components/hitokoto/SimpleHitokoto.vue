<script setup lang="ts">
import {reactive} from "vue";
import {getHitkoto} from "@/api/hitokoto";

const sentenceState = reactive({
  sentence: '加载中...',

  isLoading: false,
})

const getHitkotoSentence = async () => {
  if(sentenceState.isLoading){
    return
  }

  sentenceState.isLoading = true
  sentenceState.sentence = '加载中...'

  getHitkoto({}).then((res) => {
    sentenceState.isLoading = false
    sentenceState.sentence = res.data.hitokoto
  })
}

getHitkotoSentence()
</script>

<template>
  <div :style="{cursor: (sentenceState.isLoading ? 'not-allowed' : 'pointer')}" @click="getHitkotoSentence" class="text">
    {{ sentenceState.sentence }}
  </div>
</template>

<style lang="scss" scoped>
.text{
  color: var(--el-text-color-secondary);
}
</style>
