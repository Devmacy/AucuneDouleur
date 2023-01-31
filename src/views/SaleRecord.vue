<template>
  <el-select v-model="recordState.goodsId" placeholder="选择商品" @change="setGoodsInfo" filterable>
    <el-option
        v-for="item in recordState.goodsList"
        :key="item.goodsId"
        :label="item.goodsName"
        :value="item.goodsId"
    />
  </el-select>

  <el-input-number v-model="recordState.goodsCount" :min="1" :step="1" step-strictly @change="setGoodsCountChange"/>
  <el-button @click="pushRecord">存入数据</el-button>

  <br>
  配送费
  <el-input-number v-model="recordState.goodsDeliveryPrice" :min="0"/>
  <el-button @click="pushDeliveryPrice" :precision="2">存入配送费</el-button>


  <div class="flex-col-jc" style="width: 500px">
    <div class="flex-row-ac">
      <span class="text">id</span>
      <el-input v-model="recordState.goodsId"/>
    </div>

    <div class="flex-row-ac">
      <span class="text">名称</span>
      <el-input v-model="recordState.goodsName"/>
    </div>

    <div class="flex-row-ac">
      <span class="text">单价</span>
      <el-input v-model="recordState.goodsPrice"/>
    </div>

    <div class="flex-row-ac">
      <span class="text">总价</span>
      <el-input v-model="recordState.goodsTotalPrice"/>
    </div>

  </div>

  <el-table :data="recordState.tableData" style="width: 500px" height="500px">
    <el-table-column prop="goodsPrice" label="供货价"/>
    <el-table-column prop="goodsName" label="名称"/>
    <el-table-column prop="goodsCount" label="数量"/>
    <el-table-column prop="goodsTotalPrice" label="总价"/>
  </el-table>

</template>
<script lang="ts" setup>
import {onMounted, reactive} from 'vue'
import Sortable from 'sortablejs'

const recordState = reactive({
  tableData: [],

  goodsPrice: 0,
  goodsCount: 1,
  goodsName: '',
  goodsId: '',
  goodsTotalPrice: 0,
  goodsDeliveryPrice: 0,

  goodsList: [
    {goodsPrice: 85.0, goodsName: '倍内菲 普通鹿肉三文鱼猫粮 1.8kg/袋', goodsId: '1238734781'},
    {goodsPrice: 420.0, goodsName: '法米娜 猫粮意大利进口N&D优选系列猪肉配方添加苹果-成猫用猫粮5kg/袋', goodsId: '452352452345'},
    {goodsPrice: 145.0, goodsName: '冠能 三文鱼配方成猫全价猫粮 2.5kg/袋', goodsId: '1234318535'}
  ],
})

const result = [...recordState.tableData]

onMounted(() => {
  const tbody = document.querySelector('.el-table__body-wrapper table tbody') as HTMLElement
  Sortable.create(tbody, {
    animation: 180,
    delay: 0,
    onEnd: ({oldIndex, newIndex}) => {
      // 同时协调更新数组
      const currRow = result.splice(oldIndex, 1)[0]
      result.splice(newIndex, 0, currRow)
    }
  })
})

const pushRecord = () => {
  const obj = {
    goodsPrice: recordState.goodsPrice,
    goodsName: recordState.goodsName,
    goodsCount: recordState.goodsCount,
    goodsTotalPrice: recordState.goodsTotalPrice
  }
  recordState.tableData.push(obj)

  // 重置数量
  recordState.goodsCount = 1
}

const pushDeliveryPrice = () => {
  const obj = {
    price: recordState.goodsDeliveryPrice,
    goodsName: 'P',
    goodsCount: 1,
    goodsTotalPrice: recordState.goodsDeliveryPrice
  }
  recordState.tableData.push(obj)
  // 重置配送费
  recordState.goodsDeliveryPrice = 0
}

const setGoodsInfo = (value) => {
  const item = recordState.goodsList.find((item) => {
    return item.goodsId === value
  })

  recordState.goodsId = item.goodsId
  recordState.goodsName = item.goodsName
  recordState.goodsPrice = item.goodsPrice
  recordState.goodsTotalPrice = item.goodsPrice * recordState.goodsCount
}

const setGoodsCountChange = (value) => {
  recordState.goodsCount = value
  recordState.goodsTotalPrice = value * recordState.goodsPrice
}
</script>

<style lang="scss" scoped>
.text{
  width: 100px;
}
</style>
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
