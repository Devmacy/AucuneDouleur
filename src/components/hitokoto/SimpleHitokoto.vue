<script setup lang="ts">
import {reactive} from "vue";
import {getHitkoto} from "@/api/hitokoto";

const sentenceState = reactive({
  sentence:'加载中...',
})

const getHitkotoSentence = async () => {
  let res = await getHitkoto({})
  sentenceState.sentence = res.hitokoto
}
</script>

<template>
  <div @click="getHitkotoSentence">
    {{sentenceState.sentence}}
  </div>
</template>

<style lang="scss" scoped>

</style>
