<template id="temp">
  <div>
    <div class="top">
      <el-input class="inp" v-model="username" placeholder="请输入审核人姓名"/>
      <el-button class="margin" @click="select" type="primary">查询</el-button>
    </div>
    <!-- 表格 -->
    <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%;margin-top:25px;margin-left:15px"
    border
    @selection-change="handleSelectionChange"
    >
    <!-- <el-table-column type="selection" width="45"/> -->
    <el-table-column header-align="center"
      align="center" prop='username' label="审核人"></el-table-column>
    <el-table-column header-align="center"
      align="center" prop='visitor' label="来访人"/>
    <el-table-column header-align="center"
      align="center" prop='mobile' label="来访人电话"></el-table-column>
      <el-table-column header-align="center"
      align="center" prop='carnumber' label="来访人车牌"></el-table-column>
      <el-table-column header-align="center"
      align="center" prop='addtime' label="审核时间"></el-table-column>
      <el-table-column header-align="center"
      align="center" prop='status' label="审核状态"></el-table-column>
     <el-table-column header-align="center"
      align="center" prop='' #default="scope" label="操作">
        <el-button type="info" size="small" @click="details(scope.row)">详情</el-button>
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
import { checklist, schooldel } from '../../api/index'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// 表格数据
const tableData = ref([
  {
    username: '',
    visitor: '',
    mobile: '',
    carnumber: '',
    addtime: '',
    status: ''
  }
])
// 列表
// const token = sessionStorage.getItem
const page = reactive({ // 配置对应的查询参数
  page: 1,
  pageSize: 10
})
const getList = async () => {
  const res:any = await checklist({ page: page.page, pageSize: page.pageSize })
  console.log(res)
  tableData.value = res.data.list
  total.value = res.data.total
}
getList()
// 查询
const username = ref('')
const select = async () => {
  const res:any = await checklist({ username: username.value })
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
// 详情
const details = (row:any) => {
  router.push({
    path: '/CheckDetails',
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
