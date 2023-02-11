<template>
  <div class="func-container">
    <el-button @click="pushOrder" :icon="Plus">新增订单</el-button>
    <el-button @click="clearOrder" type="danger" :icon="Delete">清空订单</el-button>
    <el-upload
        class="upload"
        v-model:file-list="fileState.fileList"
        :limit="1"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :auto-upload="false"
        :on-change="getUploadFile"
    >
      <el-button type="primary" :icon="BottomRight" :disabled="fileState.fileList.length > 0">导入</el-button>
    </el-upload>
    <el-button type="primary" :icon="TopRight">导出</el-button>
  </div>

  <el-table :data="recordState.tableData" height="500px" :span-method="objectSpanMethod" border>
    <el-table-column align="center" label="订单ID" prop="orderId" width="100">
      <template #default="scope">
        {{ `#${scope.row.orderId}` }}
      </template>
    </el-table-column>

    <el-table-column align="center" label="操作" width="70">
      <template #default="scope">
        <el-button size="small" :icon="Plus" @click="pushRecord(scope)"/>
      </template>
    </el-table-column>

    <el-table-column align="center" prop="goodsName" label="名称" min-width="180">
      <template #default="scope">
        <el-select v-if="scope.row.isEdit" v-model="scope.goodsName"
                   @change="setGoodsInfo($event,scope.$index,scope.row)">
          <el-option
              v-for="item in recordState.goodsList"
              :key="item.goodsId"
              :label="item.goodsName"
              :value="item.goodsId"
          />
        </el-select>
        <span v-else>{{ `${scope.row.goodsName}` }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" prop="goodsPrice" label="供货价" width="120">
      <template #default="scope">
        <el-input-number style="width: 100%" v-if="scope.row.isEdit" v-model="scope.row.goodsPrice" :min="0"
                         :precision="2"
                         size="small"/>
        <span v-else>{{ `￥${scope.row.goodsPrice}` }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" prop="goodsCount" label="数量" width="120">
      <template #default="scope">
        <el-input-number style="width: 100%" v-if="scope.row.isEdit" v-model="scope.row.goodsCount" :min="0"
                         :step="1"
                         step-strictly
                         size="small"/>
        <span v-else>{{ `${scope.row.goodsCount}/个` }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" prop="goodsTotalPrice" label="货物总价" width="140">
      <template #default="scope">
        <el-input-number style="width: 100%" v-if="scope.row.isEdit" v-model="scope.row.goodsTotalPrice" :min="0"
                         :precision="2"
                         size="small"/>
        <span v-else>{{ `￥${scope.row.goodsTotalPrice}` }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" prop="saleRecordTotalPrice" label="本单总价" width="150">
      <template #default="scope">
        <el-input-number style="width: 100%" v-if="scope.row.isEdit" v-model="scope.row.saleRecordTotalPrice" :min="0"
                         :precision="2"
                         size="small"/>
        <span v-else>{{ `￥${scope.row.saleRecordTotalPrice || 0.00}` }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" fixed="right" label="操作" width="150">
      <template #default="scope">
        <div class="flex-row-c-c">
          <el-button type="success" size="small" :icon="Edit" @click="scope.row.isEdit = !scope.row.isEdit"/>
          <el-button type="danger" size="small" :icon="Delete" @click="deleteSaleRecord(scope.$index)"/>
          <el-button size="small" :icon="CopyDocument" @click="pushRecord(scope)"/>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {CopyDocument, Delete, Plus, BottomRight, TopRight, Edit} from '@element-plus/icons-vue'
import {UploadProps} from "element-plus";
import * as xlsx from "xlsx";
import {readFile} from "@/utils/file";

// 销售类型
interface saleRecord {
  orderId: number,
  goodsPrice: number
  goodsName: string
  goodsCount: number
  goodsTotalPrice: number
  goodsId: number | null
  saleRecordTotalPrice?: number | string | null | undefined
  isEdit?: false | null,
}

// 商品类型
interface goodsType {
  goodsPrice: number
  goodsName: string
  goodsId: number
  goodsBrand?: string
  goodsKind?: string
  goodsShelf?: number
  goodsShelfNo?: number
}

/**
 * 订单记录
 */
const recordState = reactive({
  tableData: [] as saleRecord[], // 最终数据

  currentOrderId: 1,// 初始订单号

  spanArr: [] as number[],// 合并单元格数组

  goodsList: [] as goodsType[], //商品列表

  clickIndex: 5,
})

/**
 * 文件状态
 */
const fileState = reactive({
  fileList: []
})

/**
 * 存入订单号
 */
const pushOrder = () => {
  recordState.tableData.push({
    orderId: recordState.currentOrderId,
    goodsPrice: 0,
    goodsName: '',
    goodsCount: 0,
    goodsTotalPrice: 0,
    goodsId: null,
  })

  // 订单号加1
  recordState.currentOrderId += 1

  recordState.spanArr = getSpanArr(recordState.tableData, 'orderId') as number[]
}

/**
 * 存入订单
 * @param value 值
 * @param index 索引
 * @param row
 */
const setGoodsInfo = (value: number, index: number, row: saleRecord) => {
  if (!value) {
    return
  }

  // 找到下拉列表的值
  const fountItem = recordState.goodsList.find((item) => {
    return item.goodsId === value
  })

  if (!fountItem) {
    return;
  }
  const {goodsPrice, goodsName, goodsId} = fountItem
  recordState.tableData[index] = {
    orderId: row.orderId,
    goodsPrice: goodsPrice,
    goodsName: goodsName,
    goodsCount: 1,
    goodsTotalPrice: goodsPrice,
    goodsId: goodsId,
  }
}

/**
 * 清空订单
 */
const clearOrder = () => {
  recordState.tableData = []
  recordState.currentOrderId = 1
}

/**
 * 导入文件
 * @param event 文件
 */
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

/**
 * 添加条目
 * @param scope
 */
const pushRecord = (scope: any) => {
  // 解构索引和订单id
  const {$index, row} = scope
  const {orderId} = row

  // 在相同订单下存入数据
  recordState.tableData.splice($index + 1, 0, {
    orderId: orderId,
    goodsPrice: 0,
    goodsName: '',
    goodsCount: 0,
    goodsTotalPrice: 0,
    goodsId: null,
  })

  recordState.spanArr = getSpanArr(recordState.tableData, 'orderId') as number[]
}

/**
 * 删除条目
 * @param index 索引
 */
const deleteSaleRecord = (index: number) => {
  recordState.tableData.splice(index, 1)

  recordState.spanArr = getSpanArr(recordState.tableData, 'orderId') as number[]
}

/**
 * 合并单元格方法
 * @param event
 */
const objectSpanMethod = (event: any) => {
  const {columnIndex, rowIndex} = event

  if (columnIndex === 0 || columnIndex === 1) {
    const row = recordState.spanArr[rowIndex]
    const col = row ? 1 : 0
    return {
      rowspan: row,
      colspan: col
    }
  }
}

/**
 * 获取合并单元格数组
 * @param list 对象数组
 * @param key 需要比较的key
 */
const getSpanArr = (list: Array<any>, key = 'id') => {
  let pos = 0
  let result = []
  for (let i = 0; i < list.length; i++) {
    if (i === 0) {
      result.push(1);
    } else {
      if (list[i][key] === list[i - 1][key]) {
        result.push(0)
        result[pos] += 1
      } else {
        result.push(1)
        pos = i
      }
    }
  }

  return result
}
</script>

<style lang="scss" scoped>
.func-container {
  display: flex;

  .upload {
    display: flex;
  }

}
</style>
