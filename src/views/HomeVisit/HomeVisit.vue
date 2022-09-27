<template>
  <div class="common-layout">
    <el-container class="bbb">
      <el-aside class="left" width="200px">
        <!-- 左侧 -->
        <el-row class="tac">
          <el-col>
          <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          :router='true'
          >
            <!-- 模块 -->
            <el-menu-item index="HomeVisit">
            <el-icon><Setting /></el-icon>
            <span>首页</span>
            </el-menu-item>

            <!-- 模块 -->
            <el-sub-menu index="1">
            <template #title>
            <el-icon><User /></el-icon>
            <span>访客管理</span>
            </template>
            <el-menu-item index="FkView">访客管理</el-menu-item>
            <el-menu-item index="CancelView">核销人管理</el-menu-item>
            <el-menu-item index="SchoolView">校园动态管理</el-menu-item>
            <el-menu-item index="CheckView">审核日志</el-menu-item>
            <el-menu-item index="ChargeView">核销日志</el-menu-item>
            </el-sub-menu>

             <!-- 模块 -->
            <el-sub-menu index="4">
            <template #title>
            <el-icon><Rank /></el-icon>
            <span>行程管理</span>
            </template>
            <el-menu-item index="TrackView">轨迹管理</el-menu-item>
            <el-menu-item index="PointView">点位管理</el-menu-item>
            </el-sub-menu>

            <!-- 模块 -->
            <el-sub-menu index="2">
            <template #title>
            <el-icon><Operation /></el-icon>
            <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">角色管理</el-menu-item>
            <el-menu-item index="AdminView">管理员管理</el-menu-item>
            </el-sub-menu>

             <!-- 模块 -->
            <el-sub-menu index="3">
            <template #title>
            <el-icon><Setting /></el-icon>
            <span>设置</span>
            </template>
            <el-menu-item index="3-1">系统设置</el-menu-item>
            <el-menu-item index="3-2">部门管理</el-menu-item>
            </el-sub-menu>
          </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <el-header class="header">
          <!-- 图标 -->
          <div class="h_left">
            <el-icon class="icon" size='25px'><Expand /></el-icon>
          </div>
          <!-- 面包屑 -->
          <div class="bread">
            <el-breadcrumb class="crumb" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
            ><a href="/">访客管理</a></el-breadcrumb-item
            >
            <el-breadcrumb-item>访客管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 全屏 -->
          <div class="right">
             <el-icon class="icon" size='25px'><FullScreen /></el-icon>
          </div>
          <!-- 标签页 -->
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { User, Setting, Rank, Operation, Expand, FullScreen } from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style>
  .left{
    width: 250px;
    background-color: #545c64;
    height: 100%;
  }
  .tac{
    width: 251px;
    position: fixed;
  }
  .header{
    height: 80px;
  }
  .h_left{
    height: 50px;
    float: left;
  }
  .icon{
    margin-top: 10px;
  }
  .bread{
     float: left;
     height: 50px;
     margin-left: 20px;
  }
  .crumb{
    margin-top: 16px;
  }
  .right{
    width: 150px;
    height: 50px;
    /* background-color: darkgreen; */
    float:right ;
  }
  .bbb{
    height:100vh;
  }
</style>
