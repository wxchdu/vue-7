<template>
  <el-container style="min-height:100vh">
    <el-aside :width="sideWidth + 'px'"
      style="background-color: rgb(238, 241, 246); box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
    </el-aside>

    <el-container>
      <el-header style="border-bottom: 1px solid #ccc">
        <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" />
      </el-header>

      <el-main>
        <!-- 表示当前页面的子路由在<router-view />里面展示 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script>
// import { request } from 'http'   程序自动给加的，注释掉就可以运行了

//import request from "@/utils/request"; this.request替代 

// 出不来设置默认浏览器为chrome

import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: 'HomeView',
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      sideWidth: 200,
      isCollapse: false,
      logoTextShow: true
    }
  },
  // 分文件引入Header.vue  Aside.vue
  components: {
    Aside,
    Header
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {  // 收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {   // 展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    }
  }
}
</script>

