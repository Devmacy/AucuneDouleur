<template>
  <el-upload
      v-model:file-list="fileState.fileList"
      :limit="1"
      :auto-upload="false"
      :on-change="getUploadFile"
  >
    <el-button type="primary">上传商品单价excel表</el-button>
  </el-upload>

  <el-button type="primary" @click="exportSaleRecord">导出excel</el-button>

  <br>

  <el-select v-model="recordState.goodsId" placeholder="选择商品" @change="setGoodsInfo" filterable>
    <el-option
        v-for="item in recordState.goodsList"
        :key="item.goodsId"
        :label="item.goodsName"
        :value="item.goodsId"
    />
  </el-select>

  <el-input-number v-model="recordState.goodsCount" :min="1" :step="1" step-strictly @change="setGoodsCountChange"/>
  <el-button @click="pushRecord" :disabled="recordState.goodsList.length === 0">存入数据</el-button>

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

  <el-table :data="recordState.tableData" style="width: 500px" height="500px" row-key="goodsId">
    <el-table-column prop="goodsPrice" label="供货价"/>
    <el-table-column prop="goodsName" label="名称"/>
    <el-table-column prop="goodsCount" label="数量"/>
    <el-table-column prop="goodsTotalPrice" label="总价"/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="danger" size="small" @click="deleteSaleRecord(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>
<script lang="ts" setup>
import {onMounted, reactive} from 'vue'
import Sortable from 'sortablejs'
import {UploadProps} from "element-plus";
import * as xlsx from 'xlsx'
import {WorkBook} from "xlsx";

interface goodsType {
  goodsPrice: number
  goodsName: string
  goodsId: string
  goodsBrand?: string
  goodsKind?: string
  goodsShelf?: number
  goodsShelfNo?: number
}

interface saleRecord {
  goodsPrice: number
  goodsName: string
  goodsCount: number
  goodsTotalPrice: number
  goodsId: string
}

const recordState = reactive({
  tableData: [] as saleRecord[],

  goodsPrice: 0,
  goodsCount: 1,
  goodsName: '',
  goodsId: '',
  goodsTotalPrice: 0,
  goodsDeliveryPrice: 0,

  goodsList: [] as goodsType[],
})

const fileState = reactive({
  fileList: []
})

onMounted(() => {
  initSortableJs()
})

const initSortableJs = () => {
  const tbody = document.querySelector('.el-table__body-wrapper tbody') as HTMLElement
  Sortable.create(tbody, {
    animation: 180,
    delay: 0,
    onEnd: ({oldIndex, newIndex}) => {
      const currRow = recordState.tableData.splice(oldIndex as number, 1)[0]
      recordState.tableData.splice(newIndex as number, 0, currRow)
    }
  })
}

const pushRecord = () => {
  const obj = {
    goodsPrice: recordState.goodsPrice,
    goodsName: recordState.goodsName,
    goodsCount: recordState.goodsCount,
    goodsTotalPrice: recordState.goodsTotalPrice.toFixed(1) as unknown as number,
    goodsId: recordState.goodsId
  }
  recordState.tableData.push(obj)

  // 重置数量
  recordState.goodsCount = 1
}

const pushDeliveryPrice = () => {
  const obj = {
    goodsPrice: recordState.goodsDeliveryPrice,
    goodsName: 'P',
    goodsCount: 1,
    goodsTotalPrice: recordState.goodsDeliveryPrice.toFixed(1) as unknown as number,
    goodsId: new Date().getTime().toString()
  }
  recordState.tableData.push(obj)

  // 重置配送费
  recordState.goodsDeliveryPrice = 0
}

const deleteSaleRecord = (index: number) => {
  recordState.tableData.splice(index, 1)
}

const setGoodsInfo = (value: string) => {
  // 重置数量
  recordState.goodsCount = 1

  let item = recordState.goodsList.find((item) => {
    return item.goodsId === value
  })

  if (item === undefined) {
    item = {
      goodsPrice: 0,
      goodsName: '',
      goodsId: `${new Date().toString()}`
    }
  }

  recordState.goodsId = item.goodsId
  recordState.goodsName = item.goodsName
  recordState.goodsPrice = item.goodsPrice
  recordState.goodsTotalPrice = item.goodsPrice * recordState.goodsCount
}

const setGoodsCountChange = (value: number) => {
  recordState.goodsCount = value
  recordState.goodsTotalPrice = value * recordState.goodsPrice
}

const readFile = (file: Blob) => {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (ev) => {
      if (!ev.target) {
        return resolve({})
      }
      resolve(ev.target.result)
    }
  })
}

const getUploadFile: UploadProps['onChange'] = async (event) => {
  const file = event.raw
  if (!file) {
    return
  }
  let dataBinary = await readFile(file)
  let workBook = xlsx.read(dataBinary, {type: 'binary', cellDates: true})
  let workSheet = workBook.Sheets[workBook.SheetNames[0]]
  let data = xlsx.utils.sheet_to_json(workSheet)
  data = data.map((item: any): goodsType => {
    return {
      goodsPrice: item['供货价'],
      goodsName: item['名称'],
      goodsId: item['id'],
      goodsBrand: item['品牌'],
      goodsKind: item['种类'],
      goodsShelf: item['货架层'],
      goodsShelfNo: item['货架编号'],
    }
  })

  recordState.goodsList = data as Array<goodsType>
}

const exportSaleRecord = () => {
  const sheetData = recordState.tableData.map((item)=>{
    return {
      goodsNameWithCount:`${item.goodsName}${item.goodsName === 'P' ? '' : `* ${item.goodsCount}`}`,
      goodsTotalPrice:`${item.goodsTotalPrice}`
    }
  })
  const jsonWorkSheet = xlsx.utils.json_to_sheet(sheetData);
  const workBook: WorkBook = {
    SheetNames: ['销售表'],
    Sheets: {
      ['销售表']: jsonWorkSheet,
    }
  };
  return xlsx.writeFile(workBook, `${new Date().getMonth() + 1}月销售表.xlsx`);
}
</script>

<style lang="scss" scoped>
.text {
  width: 100px;
}
</style>
