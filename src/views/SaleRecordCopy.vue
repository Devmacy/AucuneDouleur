<template>
  <div>
    <el-button @click="pushOrder" :icon="Plus">新增订单</el-button>
    <el-button @click="clearOrder" type="danger" :icon="Delete">清空订单</el-button>
    <el-button type="primary" :icon="BottomRight">导入</el-button>
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
    <el-table-column align="center" prop="goodsName" label="名称" min-width="180"/>
    <el-table-column align="center" prop="goodsPrice" label="供货价" width="70"/>
    <el-table-column align="center" prop="goodsCount" label="数量" width="60"/>
    <el-table-column align="center" prop="goodsTotalPrice" label="货物总价" width="100"/>
    <el-table-column align="center" prop="saleRecordTotalPrice" label="本单总价" width="100"/>
    <el-table-column align="center" fixed="right" label="操作" width="110">
      <template #default="scope">
        <div class="flex-row-c-c">
          <el-button type="danger" size="small" :icon="Delete" @click="deleteSaleRecord(scope.$index)"/>
          <el-button type="success" size="small" :icon="CopyDocument" @click="pushRecord(scope)"/>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {CopyDocument, Delete, Plus, BottomRight, TopRight} from '@element-plus/icons-vue'

interface saleRecord {
  orderId: number,
  goodsPrice: number
  goodsName: string
  goodsCount: number
  goodsTotalPrice: number
  goodsId: string
  saleRecordTotalPrice?: number | string | null | undefined
}

const recordState = reactive({
  tableData: [] as saleRecord[], // 最终数据

  currentOrderId: 1,// 初始订单号

  spanArr: [] as number[],// 合并单元格数组
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
    goodsId: '',
  })

  // 订单号加1
  recordState.currentOrderId += 1

  recordState.spanArr = getSpanArr(recordState.tableData, 'orderId') as number[]
}

const clearOrder = () => {
  recordState.tableData = []
  recordState.currentOrderId = 1
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
  recordState.tableData.splice($index, 0, {
    orderId: orderId,
    goodsPrice: 0,
    goodsName: '',
    goodsCount: 0,
    goodsTotalPrice: 0,
    goodsId: '',
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

</style>
