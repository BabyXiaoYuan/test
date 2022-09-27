<template id="temp">
  <div>
    <div class="top">
      <el-input class="inp" v-model="name" placeholder="请输入地址进行查询"/>
      <el-button class="margin" @click="select" type="primary">查询</el-button>
      <el-button type="success" @click='add'>添加</el-button>
      <el-button type="danger" @click="danger">批量删除</el-button>
    </div>
    <!-- 表格 -->
    <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%;margin-top:25px;margin-left:15px"
    border
    @selection-change="handleSelectionChange"
    >
    <el-table-column type="selection" width="45"/>
    <el-table-column header-align="center"
      align="center" prop='name' label="地址"></el-table-column>
     <el-table-column header-align="center"
      align="center" prop='' #default="scope" label="操作">
        <el-button type="info" @click="dialogVisible = true">生成二维码</el-button>
        <el-button type="success" @click="updata(scope.row)"  size="small">修改</el-button>
        <el-button type="danger" @click="del(scope.row.id)" size="small">删除</el-button>
     </el-table-column>
    </el-table>
  </div>
  <div class="demo-pagination-block" style="margin-left:550px;margin-top:20px">
    <el-pagination
      v-model:currentPage="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 15, 20, 30]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="出示二维码"
    width="30%"
    :before-close="handleClose"
  >
    <qrcode-vue :value="data.payUrl" style="margin-left:90px" :size="data.size" level="H" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>

</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { pointlist, pointdel } from '../../api/index'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import QrcodeVue from 'qrcode.vue'

const router = useRouter()
// 表格数据
const tableData = ref([
  {
    name: ''
  }
])
// 列表
const page = reactive({ // 配置对应的查询参数
  page: 1,
  pageSize: 10
})
const getList = async () => {
  const res:any = await pointlist({ page: page.page, pageSize: page.pageSize })
  console.log(res)
  tableData.value = res.data.list
  total.value = res.data.total
}
getList()

// 批删
let id:any = reactive([])
const handleSelectionChange = async (val:any) => {
  id = val.map((item: { id: any }) => {
    return item.id
  })
}
const danger = async () => {
  del(id)
}

// 生成二维码
const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  dialogVisible.value = false
}
const data = reactive<{
  payUrl: string
  size: number
}>({
  payUrl: '乐宁二维码',
  size: 256
})

// 单删
const del = async (scope:any) => {
  console.log(scope)
  const res:any = await pointdel({
    id: scope
  })
  console.log(res)
  if (res.code === 10000) {
    ElMessage({
      message: '删除成功辣',
      type: 'success'
    })
    getList()
  } else {
    ElMessage({
      message: '删除失败喽',
      type: 'error'
    })
  }
}
// 查询
const name = ref('')
const select = async () => {
  const res:any = await pointlist({ idorname: name.value })
  console.log(res)
  tableData.value = res.data.list
}
// 分页
const total = ref(0) // 总条数
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val: number) => {
  page.pageSize = val
  getList()
  // console.log(val)
}
const handleCurrentChange = (val: number) => {
  page.page = val
  getList()
  // console.log(val)
}
// 添加
const add = () => {
  router.push('/PointAdd')
}
// 修改
const updata = (row:any) => {
  console.log(row)
  router.push('/PointUpdata')
  router.push({
    path: '/PointUpdata',
    query: row
  })
}
</script>
<style lang="less" scope>
  .inp{
    width: 180px;
    height: 32px;
    margin-left: 14px;
    margin-top: 10px;
  }
  .input{
    width: 190px;
    height: 30px;
    margin-left: 14px;
  }
  .margin{
    margin-left: 18px;
  }
</style>
