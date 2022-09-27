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
    <el-form-item class="margin" label="地址" prop="name">
      <el-input class="input" v-model="ruleForm.name" placeholder="请输入地址"/>
    </el-form-item>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
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
import { pointadd } from '../../api/index'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: ''
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入地址', trigger: 'blur' },
    { min: 2, max: 8, message: '请输入地址', trigger: 'blur' }
  ]
})

const submitForm = async () => {
  console.log(ruleForm)
  const res:any = await pointadd(ruleForm)
  console.log(res)
  if (res.code === 10000) {
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
    router.push('/PointView')
  } else {
    ElMessage({
      message: '添加失败',
      type: 'error'
    })
    router.push('/PointView')
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
    /* margin-left: -20px; */
    font-size:18px;
  }
</style>
