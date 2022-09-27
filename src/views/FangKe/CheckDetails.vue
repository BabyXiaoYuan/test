<template>
  <div style="font-size:24px;margin-left:28px;margin-bottom:20px">详情</div>
  <div class="box">
      <div class="fkleft">
        <p>审核人:&nbsp;&nbsp;&nbsp;{{data.values.username}}</p>
        <p>审核状态:&nbsp;&nbsp;&nbsp;{{data.values.status}}</p>
        <p>审核时间:&nbsp;&nbsp;&nbsp;{{data.values.addtime}}</p>
        <p>来访人:&nbsp;&nbsp;&nbsp;{{data.values.visitor.username}}</p>
        <p>来访人电话:&nbsp;&nbsp;&nbsp;{{data.values.visitor.mobile}}</p>
        <p>来访人身份证:&nbsp;&nbsp;&nbsp;{{data.values.visitor.card}}</p>
        <p>进校目的:&nbsp;&nbsp;&nbsp;{{data.values.visitor.reason}}</p>
        <p>来访车牌号:&nbsp;&nbsp;&nbsp;{{data.values.visitor.carnumber}}</p>
        <p>进校时间:&nbsp;&nbsp;&nbsp;{{data.values.visitor.starttime}}</p>
        <p>离校时间:&nbsp;&nbsp;&nbsp;{{data.values.visitor.endtime}}</p>
      </div>
      <div class="fkright">
        <div class="content">
          <p>健康码:</p>
          <div class="img">
            {{route.query.healthcode}}
          </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { reactive } from 'vue-demi'
import { checkshow } from '../../api/index'
const route = useRoute()
// 打印传递过来的数据
const id = route.query.logid
console.log(id)
const data = reactive([])
const list = async () => {
  const res:any = await checkshow({ id: id })
  console.log(res)
  data.values = res.data
}
list()

</script>
<style lang="less" scope>
  .fkleft{
    width: 32%;
    height: 100%;
    float: left;
    margin-left:2.5%;
    font-size: 14px;
  }
  .fkleft p{
    margin-bottom:30px;
  }
  .fkright{
  width: 32%;
  height: 100%;
  // background-color: pink;
  float: left;
  display:flex;
  flex-wrap: wrap;
  }
  .fkright p{
    display: block;
    float: left;
  }
  .img{
    float: left;
    width: 80px;
    height:80px;
    margin-left: 10px;
    background-color: dodgerblue;
  }
  .content{
    width: 100%;
    margin-bottom: 50px;
  }
</style>
