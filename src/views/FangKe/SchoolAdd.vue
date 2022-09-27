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
    <el-form-item class="margin" label="标题" prop="title">
      <el-input class="input" v-model="ruleForm.title" placeholder="请输入标题"/>
    </el-form-item>
    <el-form-item class="margin" label="关键字" prop="keywords">
      <el-input class="input" v-model="ruleForm.keywords"  placeholder="请输入关键字"/>
    </el-form-item>
    <el-form-item class="margin" label="作者" prop="author">
      <el-input class="input" v-model="ruleForm.author"  placeholder="请输入作者"/>
    </el-form-item>
    <el-form-item class="margin" label="正文" prop="content">
        <el-input
        v-model="ruleForm.content"
        :rows="4"
        class="input"
        type="textarea"
        placeholder="请输入动态正文"
        />
    </el-form-item>
    <el-form-item class="margin" label="缩略图" prop="thumb">
        <el-upload action="#"  v-model="ruleForm.thumb" list-type="picture-card" :auto-upload="false">
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
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
import type { FormInstance, FormRules, UploadFile } from 'element-plus'
import { schooladd } from '../../api/index'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

const router = useRouter()
const content = ref('')

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  title: '',
  keywords: '',
  content: '',
  author: '',
  thumb: ''
})

const rules = reactive<FormRules>({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 2, max: 8, message: '请输入标题', trigger: 'blur' }
  ],
  keywords: [
    { required: true, message: '关键字不能为空', trigger: 'blur' },
    { min: 2, max: 8, message: '关键字不能为空', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入正文', trigger: 'blur' },
    { min: 1, max: 100, message: '请输入正文', trigger: 'blur' }
  ],
  author: [
    { required: true, message: '作者不能为空', trigger: 'blur' },
    { min: 1, max: 11, message: '作者不能为空', trigger: 'blur' }
  ]
})
// 上传图片
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}

const submitForm = async () => {
  console.log(ruleForm)
  const res:any = await schooladd(ruleForm)
  console.log(res)
  if (res.code === 10000) {
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
    router.push('/SchoollView')
  } else {
    ElMessage({
      message: '添加失败',
      type: 'error'
    })
    router.push('/SchoollView')
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
