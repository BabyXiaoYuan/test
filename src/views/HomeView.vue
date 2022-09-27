 <template>
 <div class="home">
   <div class="content">
     <h3 class="font">登录</h3>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item class="col" prop="admin_name" >
        <el-input class="w-50 m-2 inp" v-model="ruleForm.admin_name" placeholder="Username"  :prefix-icon="UserFilled" size="large" dir=""/>
      </el-form-item>

      <el-form-item class="col" prop="pwd" >
        <el-input type="password" class="w-50 m-2 inp" v-model.number="ruleForm.pwd" placeholder="Password" :prefix-icon="Lock" size="large" dir=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="submitForm(ruleFormRef)"
          >登录</el-button>
      </el-form-item>
    </el-form>
   </div>
 </div>
</template>

<script lang="ts" setup>
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { login } from '../api/index'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
const router = useRouter()

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  admin_name: '',
  pwd: ''
})
const rules = reactive<FormRules>({
  // pwd: [
  //   { required: true, message: '请输入您的密码', trigger: 'blur' },
  //   { min: 5, max: 12, message: 'Length should be 5 to 12', trigger: 'blur' }
  // ],
  admin_name: [
    { required: true, message: '请输入您的正确用户名', trigger: 'blur' },
    { min: 1, max: 20, message: 'Length should be 1 to 20', trigger: 'blur' }
  ]
})

const getLogin = async () => {
  const res:any = await login(ruleForm)
  console.log(res)
  if (res.code === 10000) {
    console.log('111')
    ElMessage({
      message: '登录成功',
      type: 'success'
    })
    router.push('/HomeVisit')
    const token = sessionStorage.setItem('token', res.data)
  } else {
    ElMessage({
      message: '请输入正确的用户名密码！！！',
      type: 'error'
    })
  }
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      getLogin()
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>
<style lang="less" scoped>
.home{
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  background:url("../assets/20220418203517.73d99f43.jpg") center center no-repeat;
  background-size:cover;
}
.font{
   font-size:28px;
   text-align: center;
   color: #fff;
  margin-bottom:40px;

}
.content{
  width: 450px;
  margin: 0 auto;
  margin-top:160px;
}
.inp{
  width: 500px;
  margin-left:-110px;
  height:45px;
}
.btn{
  width: 500px;
  height: 40px;
  margin-left:-110px;
}
</style>
