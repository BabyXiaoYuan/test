<template>
  <div style="font-size:24px;margin-left:28px;margin-bottom:20px">修改</div>
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
       <el-input class="input" v-model="ruleForm.department" placeholder="请选择部门" />
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
import { canceledit } from '../../api/index'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
// 打印传递过来的数据
const row = route.query
console.log(row)
const ruleForm = reactive({
  reviewer_name: row.reviewer_name,
  openid: row.openid,
  mobile: row.mobile,
  department: row.department,
  job: row.job,
  is_use: row.is_use
})

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

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
  console.log(row.id)
  console.log(ruleForm)
  const res:any = await canceledit({
    id: row.id, formdata: ruleForm
  })
  console.log(res)
  if (res.code === 10000) {
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
    router.push('/CancelView')
  } else {
    ElMessage({
      message: '修改失败',
      type: 'error'
    })
    router.push('/CancelView')
  }
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style>
  .input{
    width: 300px;
  }
  .margin{
    margin-bottom:30px;
    font-size:18px;
  }
</style>
