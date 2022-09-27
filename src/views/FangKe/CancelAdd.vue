<template>
  <div style="font-size:24px;margin-left:28px;margin-bottom:20px">添加</div>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item class="margin" label="审核人姓名" prop="reviewer_name">
      <el-input class="input" v-model="ruleForm.reviewer_name" placeholder="请输入审核人姓名"/>
    </el-form-item>
    <el-form-item class="margin" label="openid" prop="openid">
      <el-input class="input" v-model="ruleForm.openid"  placeholder="请输入openid"/>
    </el-form-item>
    <el-form-item class="margin" label="手机号" prop="mobile">
      <el-input class="input" v-model="ruleForm.mobile"  placeholder="请输入手机号"/>
    </el-form-item>
    <el-form-item class="margin" label="部门" prop="department">
      <el-input class="input" v-model="ruleForm.department"  placeholder="请选择部门"/>
       <!-- <el-cascader v-model="ruleForm.department" :options="options" placeholder="请选择部门" @change="handleChange" /> -->
    </el-form-item>
     <el-form-item class="margin" label="职务" prop="job">
      <el-input  class="input" v-model="ruleForm.job"   placeholder="请输入职务"/>
    </el-form-item>
    <el-form-item class="margin" label="是否启用" prop="is_use">
      <el-switch v-model="ruleForm.is_use" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="margin-left:-18px;" @click="submitForm(ruleFormRef)"
        >确定</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { canceladd } from '../../api/index'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  reviewer_name: '',
  openid: '',
  mobile: '',
  // department: [],
  department: '',
  job: '',
  is_use: ''
})

const rules = reactive<FormRules>({
  reviewer_name: [
    { required: true, message: '请输入审核人姓名', trigger: 'blur' },
    { min: 2, max: 5, message: '请输入审核人姓名', trigger: 'blur' }
  ],
  openid: [
    { required: true, message: 'openid不能为空', trigger: 'blur' },
    { min: 1, max: 50, message: 'openid不能为空', trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入11位手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
  ],
  department: [
    {
      required: true,
      message: '',
      trigger: 'change'
    }
  ],
  job: [
    { required: true, message: '职务不能为空', trigger: 'blur' },
    { min: 2, max: 11, message: '职务不能为空', trigger: 'blur' }
  ]
})

const submitForm = async () => {
  console.log(ruleForm)
  const res:any = await canceladd(ruleForm)
  console.log(res)
  if (res.code === 10000) {
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
    router.push('/CancelView')
  } else {
    ElMessage({
      message: '添加失败',
      type: 'error'
    })
    router.push('/CancelView')
  }
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 级联选择器
// const props = {
//   expandTrigger: 'hover'
// }

// const handleChange = (value:string) => {
//   console.log(value)
// }
// const options = [
//   {
//     value: '经管校本部',
//     label: '经管校本部',
//     children: [
//       {
//         value: '招生办',
//         label: '招生办',
//         children: [
//           {
//             value: '西楼',
//             label: '西楼'
//           }
//         ]
//       },
//       {
//         value: '学生处',
//         label: '学生处',
//         children: [
//           {
//             value: '教育处',
//             label: '教育处'
//           }
//         ]
//       },
//       {
//         value: '总务处',
//         label: '总务处'
//       },
//       {
//         value: '工程部',
//         label: '工程部'
//       },
//       {
//         value: '教育处',
//         label: '教育处'
//       }
//     ]
//   },
//   {
//     value: '合作单位',
//     label: '合作单位',
//     children: [
//       {
//         value: '乐柠教育',
//         label: '乐柠教育'
//       },
//       {
//         value: '中科青云',
//         label: '中科青云'
//       },
//       {
//         value: '临川国际',
//         label: '临川国际'
//       },
//       {
//         value: '临川国内',
//         label: '临川国内'
//       },
//       {
//         value: '蓝基因',
//         label: '蓝基因'
//       },
//       {
//         value: '北大青鸟',
//         label: '北大青鸟'
//       },
//       {
//         value: '航空培训',
//         label: '航空培训'
//       }
//     ]
//   }
// ]

</script>
<style>
  .input{
    width: 300px;
  }
  .margin{
    margin-bottom:30px;
    /* margin-left: -20px; */
    font-size:18px;
  }
</style>
