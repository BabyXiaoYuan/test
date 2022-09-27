<template>
  <div style="font-size:24px;margin-left:28px;margin-bottom:20px">详情</div>
  <div class="box">
    <div class="title">{{data.values.title}}</div>
    <div class="author">
      <p>{{data.values.author}}</p>
      <p style="font-size:14px;">
        {{data.values.add_time}}
      </p>
    </div>
    <div class="content">
      {{data.values.content}}
    </div>
    <div class="img">
      {{data.values.thumb}}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue-demi'
import { useRoute } from 'vue-router'
import { schoolshow } from '../../api/index'
const route = useRoute()
// 打印传递过来的数据
const id = route.query.news_id
const data = reactive([])
const list = async () => {
  const res:any = await schoolshow({ id: id })
  data.values = res.data
}
console.log(data)
list()
</script>
<style>
.box{
  width: 60%;
  height: 100%;
  margin-left: 20%;
  /* background-color: darkmagenta; */
}
  .title{
    width: 100%;
    height: 55px;
    /* background-color: darkgreen; */
    font-weight: bold;
    font-size:35px;
  }
  .author{
    width: 100%;
    height: 35px;
    margin-top: 5px;
    border-bottom: 2px solid #f2f2f2;
  }
  .author p{
    /* background-color: darkkhaki; */
    display: block;
    float: left;
    margin-left: 20px;
    line-height: 35px;
  }
  .content{
    margin-left: 20px;
    margin-top: 20px;
  }
  .img{
    width: 75%;
    height: 420px;
    margin-top: 30px;
    background-color: darkorange;
  }
</style>
