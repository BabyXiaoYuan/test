<template>
  <div style="font-size:24px;margin-left:28px;margin-bottom:20px">详情</div>
  <div class="box">
      <div class="fkleft">
        <p>访客名:&nbsp;&nbsp;&nbsp;{{route.query.username}}</p>
        <p>部门:&nbsp;&nbsp;&nbsp;{{route.query.department}}</p>
        <p>手机号:&nbsp;&nbsp;&nbsp;{{route.query.mobile}}</p>
        <p>身份证号:&nbsp;&nbsp;&nbsp;{{route.query.card}}</p>
        <p>车牌号:&nbsp;&nbsp;&nbsp;{{route.query.department}}</p>
        <p>进校时间:&nbsp;&nbsp;&nbsp;{{route.query.addtime}}</p>
        <p>离校时间:&nbsp;&nbsp;&nbsp;{{route.query.endtime}}</p>
        <p>状态:&nbsp;&nbsp;&nbsp;{{route.query.status}}</p>
        <p>类型:&nbsp;&nbsp;&nbsp;{{route.query.type}}</p>
        <p>是否去过高风险地区:&nbsp;&nbsp;&nbsp;{{route.query.is_go_danger}}</p>
        <p>是否接触过高风险地区:&nbsp;&nbsp;&nbsp;{{route.query.is_contact_danger}}</p>
        <p>是否离京:&nbsp;&nbsp;&nbsp;{{route.query.is_leave}}</p>
        <p>地址:&nbsp;&nbsp;&nbsp;{{route.query.address}}</p>
      </div>
      <div class="fkright">
        <div class="content">
          <p>行程卡:</p>
          <div class="img">
            {{route.query.travelcode}}
          </div>
        </div>
        <div class="content">
          <p>健康码:</p>
          <div class="img">
            {{route.query.healthcode}}
          </div>
        </div>
        <div  class="content">
          <p>核酸:</p>
          <div class="img">
            {{route.query.nucleicacid}}
          </div>
        </div>
        <div class="content">
          <p>疫苗:</p>
          <div class="img">
            {{route.query.vaccination}}
          </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
// 打印传递过来的数据
console.log(route.query)

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
