<template id="temp">
  <div>
    <div class="top">
      <el-input class="inp" v-model="ids" placeholder="请输入查询内容"/>
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
      align="center" prop='title' label="标题"></el-table-column>
    <el-table-column header-align="center"
      align="center" prop='author' label="作者"/>
    <el-table-column header-align="center"
      align="center" prop='keywords' label="关键字"></el-table-column>
     <el-table-column header-align="center"
      align="center" prop='' #default="scope" label="操作">
        <el-button type="success" size="small">修改</el-button>
        <el-button type="danger" @click="del(scope.row.news_id)" size="small">删除</el-button>
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
import { schoolist, schooldel } from '../../api/index'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// 表格数据
const tableData = ref([
  {
    title: '',
    author: '',
    keywords: ''
  }
])
// 列表
const page = reactive({ // 配置对应的查询参数
  page: 1,
  pageSize: 10
})
const getList = async () => {
  const res:any = await schoolist({ page: page.page, pageSize: page.pageSize })
  console.log(res)
  tableData.value = res.data.list
  total.value = res.data.total
}
getList()

// 批删
let newsid:any = reactive([])
const handleSelectionChange = async (val:any) => {
  // eslint-disable-next-line camelcase
  newsid = val.map((item: { news_id: any }) => {
    return item.news_id
  })
  console.log(newsid)
}
const danger = async () => {
  del(newsid)
}

// 单删
const del = async (scope:any) => {
  console.log(scope)
  const res:any = await schooldel({
    news_id: scope
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
const ids = ref('')
const select = async () => {
  const res:any = await schoolist({ idortitle: ids.value })
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
}
const handleCurrentChange = (val: number) => {
  page.page = val
  getList()
}
// 添加
const add = () => {
  router.push('/SchoolAdd')
}
// 详情
const details = (row:any) => {
  router.push({
    path: '/SchoolDetails',
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
