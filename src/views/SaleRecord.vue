<template>
  哇偶宠物店单据录入
</template>
<script lang="ts" setup></script>
<!--<template>-->
<!--  <el-upload-->
<!--      v-model:file-list="fileList"-->
<!--      :limit="1"-->
<!--      :auto-upload="false"-->
<!--      :on-change="getUploadFile"-->
<!--  >-->
<!--    <el-button type="primary">Click to upload</el-button>-->
<!--  </el-upload>-->

<!--  <el-select v-model="item" filterable clearable @change="setPrice">-->
<!--    <el-option-->
<!--        v-for="item in itemList"-->
<!--        :key="item.index"-->
<!--        :label="item.label"-->
<!--        :value="item.index"-->
<!--    />-->
<!--  </el-select>-->
<!--  <el-input-number v-model="num" :min="1" :max="10" @change="handleNumChange" />-->
<!--  单价：{{singlePrice}}-->
<!--  总价：{{sumPrice}}-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import {ref} from "vue";-->
<!--import type {UploadProps, UploadUserFile} from 'element-plus'-->
<!--import * as xlsx from 'xlsx'-->

<!--const fileList = ref<UploadUserFile[]>([])-->
<!--const itemList = ref([])-->
<!--const singlePrice = ref(0)-->
<!--const sumPrice = ref(0)-->
<!--const num = ref(1)-->

<!--const readFile = (file: any) => {-->
<!--  return new Promise(resolve => {-->
<!--    let reader = new FileReader()-->
<!--    reader.readAsBinaryString(file)-->
<!--    reader.onload = (ev: any) => {-->
<!--      resolve(ev.target.result)-->
<!--    }-->
<!--  })-->
<!--}-->

<!--function getListAddValue(list: Array<any>, obj: object, otherKey: string, needKeyValue: string) {-->
<!--  if (list.length === 0) {-->
<!--    return []-->
<!--  }-->

<!--  const result = []-->
<!--  for (let i = 0; i < list.length; i++) {-->
<!--    result.push({-->
<!--      index:i,-->
<!--      ...list[i],-->
<!--      ...obj,-->
<!--      [otherKey]: list[i][needKeyValue]-->
<!--    })-->
<!--  }-->
<!--  return result-->
<!--}-->

<!--const item = ref('')-->
<!--/**-->
<!-- * 上传change回调-->
<!-- * @param event-->
<!-- */-->
<!--const getUploadFile: UploadProps['onChange'] = async (event) => {-->
<!--  const file = event.raw-->

<!--  let dataBinary = await readFile(file)-->
<!--  let workBook = xlsx.read(dataBinary, {type: 'binary', cellDates: true})-->
<!--  let workSheet = workBook.Sheets[workBook.SheetNames[0]]-->
<!--  let data = xlsx.utils.sheet_to_json(workSheet)-->
<!--  data = getListAddValue(data,{},'price','供货价')-->
<!--  data = getListAddValue(data,{},'label','名称')-->
<!--  itemList.value.push(...data)-->
<!--}-->

<!--const setPrice = (index)=>{-->
<!--  singlePrice.value = itemList.value[index]['price']-->
<!--  sumPrice.value = itemList.value[index]['price'] * num.value-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="scss">-->

<!--</style>-->
