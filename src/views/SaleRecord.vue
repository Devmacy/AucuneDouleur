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

        <el-button type="primary" @click="exportSaleRecord">导出</el-button>
      </div>

      <el-divider/>

      <div class="info-container flex-row">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="box-header">
              <el-select class="select" v-model="recordState.goodsId" placeholder="选择商品" @change="setGoodsInfo"
                         filterable>
                <el-option
                    v-for="item in recordState.goodsList"
                    :key="item.goodsId"
                    :label="item.goodsName"
                    :value="item.goodsId"
                />
              </el-select>

              <el-input-number class="input-number" v-model="recordState.goodsCount" controls-position="right" :min="1"
                               :step="1"
                               step-strictly
                               @change="setGoodsCountChange"/>

              <el-button :disabled="recordState.goodsList.length === 0" type="success" :icon="ArrowRightBold" circle
                         @click="pushRecord"/>
            </div>
          </template>

          <div class="card-body">
            <div class="flex-row-ac">
              <span class="key-text">商品:</span>
              <span class="content-text">{{ recordState.goodsName }}</span>
            </div>

            <div class="flex-row-ac">
              <span class="key-text">单价:</span>
              <span class="content-text">{{ recordState.goodsPrice.toFixed(1) }}￥</span>
            </div>

            <div class="flex-row-ac">
              <span class="key-text">数量:</span>
              <span class="content-text">{{ recordState.goodsCount }}</span>
            </div>

            <div class="flex-row-ac">
              <span class="key-text">总价:</span>
              <span class="content-text">{{ recordState.goodsTotalPrice.toFixed(1) }}￥</span>
            </div>

            <div class="flex-row-ac">
              <span class="key-text">订单总价:</span>
              <div>
                <el-input-number class="content-text" v-model="recordState.saleRecordTotalPrice"
                                 controls-position="right"
                                 :min="0"
                                 :step="1"
                                 :precision="1"/>
                <el-switch
                    v-model="recordState.isIncludeSaleRecordTotalPrice"
                    inline-prompt
                    active-text="是"
                    inactive-text="否"
                />
              </div>
            </div>
          </div>
        </el-card>

        <el-card class="box-secondary-card" shadow="hover">
          <template #header>
            <div class="box-header">
              <div>配送费</div>
              <el-button type="warning" :icon="ArrowRightBold" circle
                         @click="pushDeliveryPrice"/>
            </div>
          </template>
          <div>
            <span>价格:</span>
            <el-input-number class="content-text" v-model="recordState.goodsDeliveryPrice" controls-position="right"
                             :min="0"
                             :step="1"
                             :precision="1"/>
          </div>
        </el-card>
      </div>

      <el-divider/>
    </div>

    <div class="right-output">
      <el-table :data="recordState.tableData" class="table" height="calc(100%)" row-key="goodsId"
                :row-class-name="tableRowClassName" show-summary border>
        <el-table-column width="80" align="center">
          <template #default>
            <el-icon style="cursor: pointer" class="move-handle">
              <Location/>
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="goodsName" label="名称" min-width="180"/>
        <el-table-column align="center" prop="goodsPrice" label="供货价" width="70"/>
        <el-table-column align="center" prop="goodsCount" label="数量" width="60"/>
        <el-table-column align="center" prop="goodsTotalPrice" label="货物总价" width="100"/>
        <el-table-column align="center" prop="saleRecordTotalPrice" label="本单总价" width="100"/>
        <el-table-column align="center" fixed="right" label="操作" width="80">
          <template #default="scope">
            <el-button type="danger" size="small" @click="deleteSaleRecord(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>
<script lang="ts" setup>
import {onMounted, reactive} from 'vue'
import Sortable from 'sortablejs'
import {UploadProps} from "element-plus";
import * as xlsx from 'xlsx'
import {WorkBook} from "xlsx";
import {CurrentTime} from "@/utils/time/CurrentTime";
import {ArrowRightBold} from '@element-plus/icons-vue'

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

  isIncludeSaleRecordTotalPrice: false,

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
    handle: '.move-handle',
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
    goodsId: recordState.goodsId,
    saleRecordTotalPrice: recordState.isIncludeSaleRecordTotalPrice ? recordState.saleRecordTotalPrice : ''
  }
  recordState.tableData.unshift(obj)

  // 重置数量
  recordState.goodsCount = 1
  recordState.saleRecordTotalPrice = 0
  recordState.isIncludeSaleRecordTotalPrice = false
}

const pushDeliveryPrice = () => {
  const obj = {
    goodsPrice: recordState.goodsDeliveryPrice,
    goodsName: 'P',
    goodsCount: 1,
    goodsTotalPrice: recordState.goodsDeliveryPrice.toFixed(1) as unknown as number,
    goodsId: new Date().getTime().toString(),
    saleRecordTotalPrice: recordState.isIncludeSaleRecordTotalPrice ? recordState.saleRecordTotalPrice : ''
  }
  recordState.tableData.unshift(obj)

  // 重置配送费
  recordState.goodsDeliveryPrice = 0
  recordState.saleRecordTotalPrice = 0
  recordState.isIncludeSaleRecordTotalPrice = false
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
      font-size: var(--el-font-size-extra-large);
      justify-content: space-between;

      .box-card {
        width: 76%;

        .box-header {
          display: flex;
          align-items: center;

          .select {
            flex: 1;
          }

          .input-number {
          }


        }

        .card-body {
          display: grid;

          .key-text {
            padding: 5px 0;
            width: 10%;
            color: var(--el-text-color-primary);
          }

          .content-text {
            flex: 1;
            color: var(--el-text-color-secondary);
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
