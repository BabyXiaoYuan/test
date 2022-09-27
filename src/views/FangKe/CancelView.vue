<template id="temp">
  <div>
    <div class="top">
      <el-input class="inp" v-model="ids" placeholder="Please input" />
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
    <el-table-column type="selection" header-align="center" width="45"/>
    <el-table-column header-align="center"
      align="center" prop='reviewer_name' label="核销人姓名"></el-table-column>
    <el-table-column header-align="center"
      align="center" prop='mobile' label="手机号"/>
    <el-table-column header-align="center"
      align="center" prop='department' label="部门"></el-table-column>
    <el-table-column header-align="center"
      align="center" prop='job' label="职务"/> />
    <el-table-column header-align="center"
      align="center" prop='is_use' label="是否启用">
       <template #default="scope">
        <el-switch v-model="scope.row.is_use"
          :active-value="1"
          :inactive-value="0"
          @change=changeSwitch($event,scope.row.id)>
        </el-switch>
       </template>
    </el-table-column>
     <el-table-column header-align="center"
      align="center" prop='' #default="scope" label="操作">
        <el-button type="success" @click="updata(scope.row)" size="small">修改</el-button>
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
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { cancelist, canceldel, cancelshow, cancelstatus } from '../../api/index'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// 表格数据
const tableData = ref([
  {
    reviewer_name: '',
    mobile: '',
    department: '',
    job: '',
    is_use: ''
  }
])
const parentBorder = ref('')
// 列表
const page = reactive({ // 配置对应的查询参数
  page: 1,
  pageSize: 10
})
const getList = async () => {
  const res:any = await cancelist({ page: page.page, pageSize: page.pageSize })
  console.log(res)
  total.value = res.total
  tableData.value = res.data.list
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

// 启用开关
// 1开0关
const sw = ref()
const changeSwitch = async (val:any, id:any) => {
  console.log(val)
  console.log(id)
  if (val === 1) {
    sw.value = true
  } else if (val === 0) {
    sw.value = false
  }
  console.log(sw)
  const res:any = await cancelstatus({
    is_use: sw.value,
    id: id
  })
  console.log(res)
  if (res.code === 10000) {
    ElMessage({
      message: '状态修改成功辣',
      type: 'success'
    })
    getList()
  }
}

// 单删
const del = async (scope:any) => {
  const res:any = await canceldel({
    id: scope
  })
  // console.log(res)
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
const ids = ref('')
const select = async () => {
  const res:any = await cancelist({ idorname: ids.value })
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
const add = async () => {
  router.push('/CancelAdd')
}
// 修改
const updata = async (row:any) => {
  // router.push('/CancelUpd')
  router.push({
    path: '/CancelUpd',
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
