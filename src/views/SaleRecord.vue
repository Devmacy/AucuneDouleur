<template>

  <div class="main-container">

    <div class="left-operation">

      <div class="flex-row upload-container">
        <el-upload
            class="upload"
            v-model:file-list="fileState.fileList"
            :limit="1"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :auto-upload="false"
            :on-change="getUploadFile"
        >
          <el-button type="primary" :disabled="fileState.fileList.length > 0">上传商品单价excel表</el-button>
        </el-upload>

        <div>
          <el-button type="primary" @click="exportSaleRecord">导出</el-button>
          <el-button @click="flagState.isShowSetting = true">设置</el-button>
        </div>
      </div>

      <el-divider/>

      <div class="info-container flex-row">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="box-card-header">
              <div class="flex-row-ac" style="justify-content: space-between">
                <div style="font-size: 28px">
                  <span>订单</span>
                  <span>{{ `￥${recordState.saleRecordTotalPrice}` }}</span>
                </div>

                <div>
                  <scroll-number ref="orderScrollNumber" :integer="[0,0,0]"
                                 :decimal="[0,0]"
                                 @get-number="getOrderSumNumber"/>
                </div>
                <el-button style="height: 80px;width: 88px" :disabled="recordState.goodsList.length === 0"
                           type="success"
                           :icon="ArrowRightBold"
                           @click="pushRecord"/>
              </div>

              <el-divider border-style="dashed" style="height: inherit"/>

              <div class="flex-row-ac" style="justify-content: space-between">
                <div style="font-size: 28px">配送<span>{{ `￥${recordState.goodsDeliveryPrice}` }}</span></div>
                <div>
                  <scroll-number :integer="[0,0,0]" :decimal="[0,0]"
                                 @get-number="getNumber"/>
                </div>
                <el-button style="height: 80px;width: 88px" type="warning"
                           :icon="ArrowRightBold"
                           @click="pushDeliveryPrice"/>
              </div>
            </div>
          </template>

          <el-descriptions
              :column="1"
              border
              class="box-card-body"
          >

            <el-descriptions-item label="ID"><span style="color: var(--el-color-info)">{{ recordState.goodsId }}</span>
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <span>

                  商品
                </span>
              </template>
              <div class="flex-row-ac">
                <el-select class="select" v-model="recordState.goodsId" placeholder="选择商品" @change="setGoodsInfo"
                           filterable>
                  <el-option
                      v-for="item in recordState.goodsList"
                      :key="item.goodsId"
                      :label="item.goodsName"
                      :value="item.goodsId"
                  />
                </el-select>
              </div>
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <span>

                  单价
                </span>
              </template>
              <span style="color: var(--el-color-success)">{{ recordState.goodsPrice.toFixed(1) }}元</span>
            </el-descriptions-item>

            <el-descriptions-item label="数量">
              <div class="flex-row-ac">
                <el-input-number class="input-number" v-model="recordState.goodsCount" controls-position="right"
                                 :min="1"
                                 :step="1"
                                 step-strictly
                                 @change="setGoodsCountChange"/>
                <el-button style="margin-left: 5px" :disabled="recordState.goodsList.length === 0" type="success"
                           :icon="ArrowRightBold" circle
                           @click="pushRecord"/>
              </div>
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <span>
                  总价
                </span>
              </template>
              <span style="color: var(--el-color-danger)">{{ recordState.goodsTotalPrice.toFixed(1) }}元</span>
            </el-descriptions-item>

          </el-descriptions>
        </el-card>

      </div>

      <el-divider/>
    </div>

    <div class="right-output">
      <el-table :data="recordState.tableData" class="table" height="calc(100%)" row-key="goodsId"
                :row-class-name="tableRowClassName" show-summary border>
        <el-table-column align="center" prop="goodsName" label="名称" min-width="180"/>
        <el-table-column align="center" prop="goodsPrice" label="供货价" width="70"/>
        <el-table-column align="center" prop="goodsCount" label="数量" width="60"/>
        <el-table-column align="center" prop="goodsTotalPrice" label="货物总价" width="100"/>
        <el-table-column align="center" prop="saleRecordTotalPrice" label="本单总价" width="100"/>
        <el-table-column align="center" fixed="right" label="操作" width="80">
          <template #default="scope">
            <el-button type="danger" size="small" :icon="Delete" @click="deleteSaleRecord(scope.$index)" circle/>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-drawer
        v-model="flagState.isShowSetting"
        title="设置"
        direction="rtl"
    >
      <el-descriptions
          :column="1"
          border
      >
      </el-descriptions>

    </el-drawer>
  </div>

</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {UploadProps} from "element-plus";
import * as xlsx from 'xlsx'
import {WorkBook} from "xlsx";
import {CurrentTime} from "@/utils/time/CurrentTime";
import {ArrowRightBold, Delete} from '@element-plus/icons-vue'
import ScrollNumber from "@/components/number/ScrollNumber.vue";

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
  saleRecordTotalPrice?: number | string | null | undefined
}

const recordState = reactive({
  tableData: [] as saleRecord[],

  goodsPrice: 0,
  goodsCount: 1,
  goodsName: '',
  goodsId: '',
  goodsTotalPrice: 0,
  goodsDeliveryPrice: 0,
  saleRecordTotalPrice: 0,

  goodsList: [] as goodsType[],
})

const flagState = reactive({
  isShowSetting: false
})

const fileState = reactive({
  fileList: []
})

const orderScrollNumber = ref()

const pushRecord = () => {
  const obj = {
    goodsPrice: recordState.goodsPrice.toFixed(1) as unknown as number,
    goodsName: recordState.goodsName,
    goodsCount: recordState.goodsCount,
    goodsTotalPrice: recordState.goodsTotalPrice.toFixed(1) as unknown as number,
    goodsId: recordState.goodsId,
    saleRecordTotalPrice:
        recordState.saleRecordTotalPrice !== 0
            ? recordState.saleRecordTotalPrice.toFixed(1)
            : ''
  }
  recordState.tableData.unshift(obj)

  // 重置数量
  recordState.goodsCount = 1
  recordState.saleRecordTotalPrice = 0
  orderScrollNumber.value.init()
}

const pushDeliveryPrice = () => {
  const obj = {
    goodsPrice: recordState.goodsDeliveryPrice.toFixed(1) as unknown as number,
    goodsName: 'P',
    goodsCount: 1,
    goodsTotalPrice: recordState.goodsDeliveryPrice.toFixed(1) as unknown as number,
    goodsId: new Date().getTime().toString(),
    saleRecordTotalPrice:
        recordState.saleRecordTotalPrice !== 0
            ? recordState.saleRecordTotalPrice.toFixed(1)
            : ''
  }
  recordState.tableData.unshift(obj)
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

const tableRowClassName = ({row}: { row: saleRecord }) => {
  if (row.goodsName === 'P') {
    return 'warning-row'
  }
  return ''
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
  const sheetData = [...recordState.tableData].reverse().map((item) => {
    return {
      goodsNameWithCount: `${item.goodsName}${item.goodsName === 'P' ? '' : `* ${item.goodsCount}`}`,
      goodsTotalPrice: `${item.goodsTotalPrice}`,
      saleRecordTotalPrice: `${item.saleRecordTotalPrice}`
    }
  })
  const jsonWorkSheet = xlsx.utils.json_to_sheet(sheetData);
  const workBook: WorkBook = {
    SheetNames: ['销售表'],
    Sheets: {
      ['销售表']: jsonWorkSheet,
    }
  };
  const date = new CurrentTime(new Date())
  return xlsx.writeFile(workBook, `${date.formatterTime('yyyy年MM月dd日')}${date.getWeekDay()}销售表.xlsx`);
}

const getNumber = (event: { data: number }) => {
  const {data} = event
  recordState.goodsDeliveryPrice = data
}

const getOrderSumNumber = (event: { data: number }) => {
  const {data} = event
  recordState.saleRecordTotalPrice = data
}
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;

  .left-operation {
    width: 50%;
    overflow: auto;

    .upload-container {
      width: 100%;
      padding: 10px;
      justify-content: space-between;
      box-sizing: border-box;

      .upload {
        display: flex;
      }
    }

    .info-container {
      justify-content: space-between;

      .box-card {
        width: 100%;
        margin: 0 10px 0 0;

        .box-card-header {

          .left {
          }

          .right {
            margin-top: 5px;
          }

          .push-button {
            margin-left: 5px;
          }
        }

        .box-card-body {

          .select {
            width: 100%;
          }

          .input-number {
            width: 100%;
          }
        }
      }

      .box-secondary-card {
        width: 24%;
        margin: 0 2%;

        .box-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }

  .right-output {
    width: 50%;

    .table {
      width: 100%;
    }
  }
}
</style>

<style lang="scss">
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
</style>
