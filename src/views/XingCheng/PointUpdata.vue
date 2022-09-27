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
    <el-form-item class="margin" label="地址" prop="name">
      <el-input class="input" v-model="ruleForm.name" placeholder="地址"/>
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
import { pointedit } from '../../api/index'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
// 打印传递过来的数据
const row = route.query
console.log(row)
const ruleForm = reactive({
  name: row.name
})

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入地址', trigger: 'blur' },
    { min: 2, max: 10, message: '请输入地址', trigger: 'blur' }
  ]
})

const submitForm = async () => {
  console.log(row.id)
  console.log(ruleForm)
  const res:any = await pointedit({
    id: row.id, formdata: ruleForm
  })
  console.log(res)
  // if (res.code === 10000) {
  //   ElMessage({
  //     message: '修改成功',
  //     type: 'success'
  //   })
  //   router.push('/PointView')
  // } else {
  //   ElMessage({
  //     message: '修改失败',
  //     type: 'error'
  //   })
  //   router.push('/PointView')
  // }
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
