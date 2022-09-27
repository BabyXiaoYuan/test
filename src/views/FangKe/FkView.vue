<template id="temp">
  <div>
    <div class="top">
      <el-input class="inp" v-model="name" placeholder="请输入访客名称" />
      <el-input class="inp" v-model="mobile" placeholder="请输入手机号" />
      <el-select class="input" v-model="typename" placeholder="请选择人员类型">
        <el-option
          v-for="item in typenamelist"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select class="input" v-model="value" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select class="input" v-model="value" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select class="input" v-model="value" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
      </el-select>
      <el-input class="inp" v-model="come" placeholder="Password" :prefix-icon="Clock"></el-input>
      <el-input class="inp" v-model="go" placeholder="Password" :prefix-icon="Clock"></el-input>
      <el-button class="margin" type="primary" @click="select">查询</el-button>
      <el-button type="success" @click="add">添加</el-button>
      <el-button type="info">批量审核</el-button>
      <el-button type="warning">批量导出</el-button>
      <el-button type="success">批量导入</el-button>
      <el-button type="danger" @click="danger">批量删除</el-button>
    </div>
    <!-- 表格 -->
    <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%;margin-top:30px;margin-left:15px"
    border
    @selection-change="handleSelectionChange"
    >
    <el-table-column type="selection" width="45" />
    <el-table-column header-align="center"
      align="center" prop='username' label="用户名"></el-table-column>
    <el-table-column header-align="center"
      align="center" prop='mobile' label="手机号" />
    <el-table-column header-align="center"
      align="center" prop='department' label="部门" ></el-table-column>
    <el-table-column header-align="center"
      align="center" prop='starttime' label="进校时间" />
    <el-table-column header-align="center"
      align="center" prop='endtime' label="离校时间" />
    <el-table-column header-align="center"
      align="center" prop='typename' label="人员类型" /> />
    <el-table-column header-align="center"
      align="center" prop='status' label="状态"   />
    <el-table-column header-align="center"
      align="center" prop='type' label="是否离校"  />
     <el-table-column header-align="center"
      align="center" prop='' #default="scope" label="操作"  width="260">
      <el-button type="primary" size="small">审核</el-button>
        <el-button type="success" size="small">修改</el-button>
        <el-button type="danger" @click="del(scope.row.v_id)" size="small">删除</el-button>
        <el-button type="success" @click="details(scope.row)" size="small">详情</el-button>
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
import { Clock } from '@element-plus/icons-vue'
import { ElMessageBox, ElTable, ElMessage } from 'element-plus'
import { fklist, fkdel, fkshow } from '../../api/index'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// 根据访客名称
const name = ref('')
const mobile = ref('')
// 查询
const select = async () => {
  console.log('查询')
}

const typename = ref('')
const typenamelist = [
  {
    value: '外来人员',
    label: '外来人员'
  },
  {
    value: '老师',
    label: '老师'
  },
  {
    value: '学生',
    label: '学生'
  }
]
const value = ref('')
const come = ref('')
const go = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option1',
    label: 'Option1'
  }
]
// 表格数据
const tableData = ref([
  {
    username: '',
    mobile: '',
    card: '',
    carnumber: '',
    starttime: '',
    endtime: '',
    department: '',
    status: ''
  }
])
// 列表
const page = reactive({ // 配置对应的查询参数
  page: 1,
  pageSize: 10
})
// const token = sessionStorage.getItem
const getList = async () => {
  const res:any = await fklist({ page: page.page, pageSize: page.pageSize })
  console.log(res)
  tableData.value = res.data.findvisiuser.list
  total.value = res.data.findvisiuser.total
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

getList()
// 批删
let vid:any = reactive([])
const handleSelectionChange = async (val:any) => {
  // eslint-disable-next-line camelcase
  vid = val.map((item: { v_id: any }) => {
    return item.v_id
  })
  console.log(vid)
}
const danger = async () => {
  del(vid)
}

// 单删
const del = async (scope:any) => {
  const res:any = await fkdel({
    v_id: scope
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
// 详情
const details = async (scope:any) => {
  router.push({
    path: '/FKDetails',
    query: scope
  })
}
// 添加
const add = async () => {
  router.push('/FKADD')
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
