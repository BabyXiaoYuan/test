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
    <el-form-item class="margin" label="类型" prop="typename">
      <el-radio-group style="margin-top:-3px" v-model="ruleForm.typename" class="ml-4">
        <el-radio label="外来人员" size="large">外来人员</el-radio>
        <el-radio label="老师" size="large">老师</el-radio>
        <el-radio label="学生" size="large">学生</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item class="margin" label="访客名称" prop="username">
      <el-input class="input" v-model="ruleForm.username" placeholder="请输入访客姓名"/>
    </el-form-item>
     <el-form-item class="margin" label="手机号" prop="mobile">
      <el-input class="input" v-model="ruleForm.mobile"  placeholder="请输入手机号"/>
    </el-form-item>
    <el-form-item class="margin" label="openid" prop="openid">
      <el-input class="input" v-model="ruleForm.openid"  placeholder="请输入openid"/>
    </el-form-item>
    <el-form-item class="margin" label="身份证号" prop="card">
      <el-input class="input" v-model="ruleForm.card"  placeholder="请输入身份证号"/>
    </el-form-item>
    <el-form-item class="margin" label="车牌号" prop="carnumber">
      <el-input class="input" v-model="ruleForm.carnumber"  placeholder="请输入车牌号"/>
    </el-form-item>
    <el-form-item class="margin" label="理由" prop="reason">
      <el-input class="input" v-model="ruleForm.reason"  placeholder="请输入理由"/>
    </el-form-item>
    <el-form-item class="margin" label="进校时间" prop="starttime">
      <el-input class="input" v-model="ruleForm.starttime"  placeholder="请输入进校时间"/>
    </el-form-item>
    <el-form-item class="margin" label="离校时间" prop="endtime">
      <el-input class="input" v-model="ruleForm.endtime"  placeholder="请输入离校时间"/>
    </el-form-item>
    <el-form-item class="margin" label="地区" prop="carnumber">
      <el-input class="input" v-model="ruleForm.carnumber"  placeholder="请输入地区"/>
    </el-form-item>
    <el-form-item class="margin" label="部门" prop="department">
      <el-input class="input" v-model="ruleForm.department"  placeholder="请选择部门"/>
       <!-- <el-cascader v-model="ruleForm.department" :options="options" placeholder="请选择部门" @change="handleChange" /> -->
    </el-form-item>
    <el-form-item class="margin" label="是否接触过高风险地区" prop="is_contact_danger">
      <el-radio-group style="margin-top:-3px" v-model="ruleForm.is_contact_danger" class="ml-4">
        <el-radio label="是" size="large">是</el-radio>
        <el-radio label="否" size="large">否</el-radio>
      </el-radio-group>
    </el-form-item>
       <el-form-item class="margin" label="是否离京" prop="is_leave">
      <el-radio-group style="margin-top:-3px" v-model="ruleForm.is_leave" class="ml-4">
        <el-radio label="是" size="large">是</el-radio>
        <el-radio label="否" size="large">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      </el-form-item>
       <el-form-item class="margin" label="健康状态" prop="is_health">
      <el-radio-group style="margin-top:-3px" v-model="ruleForm.is_health" class="ml-4">
        <el-radio label="良好" size="large">良好</el-radio>
        <el-radio label="一般" size="large">一般</el-radio>
        <el-radio label="差" size="large">差</el-radio>
      </el-radio-group>
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
import { fkadd } from '../../api/index'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  mobile: '',
  openid: '',
  card: '',
  carnumber: '',
  reason: '',
  starttime: '',
  endtime: '',
  typename: '',
  is_contact_danger: '', // 是否接触过高风险地区
  is_leave: '', // 是否离京,
  is_health: ''
  // adduserid: ''
})

const rules = reactive<FormRules>({
  openid: [
    { required: true, message: 'openid不能为空', trigger: 'blur' },
    { min: 1, max: 50, message: 'openid不能为空', trigger: 'blur' }
  ]
})
console.log(sessionStorage)
const submitForm = async () => {
  console.log(ruleForm)
  const res:any = await fkadd({ ruleForm: ruleForm })
  console.log(res)
//   // if (res.code === '00000') {
//   //   ElMessage({
//   //     message: '添加成功',
//   //     type: 'success'
//   //   })
//   // } else {
//   //   ElMessage({
//   //     message: '添加失败',
//   //     type: 'error'
//   //   })
//   // }
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
