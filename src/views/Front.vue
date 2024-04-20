<template>
  <div>
    <!-- type="text/css"改为type="css"  -->

    <head>
      <link href="../assets/frontstyle.css" rel="stylesheet" type="css" media="all" />
    </head>


    <div class="header">
      <!-- class="header" 绿色上边框 -->

      <!-- <div class="bigtitle">
        社团招新页面
      </div> -->


      <!-- 绿色上边框 -->
      <div class="cssmenu">
        <h1>&nbsp; 社 &nbsp; 团 &nbsp; 招 &nbsp; 新 &nbsp; 页 &nbsp; 面 &nbsp;</h1>
        <!-- <ul> -->
        <!-- 绿色上边框 -->
        <div class="logo0">
          <a href="Front.vue" class="logo0">
          </a>
        </div>
        <!-- </ul> -->
      </div>

    </div>


    <div class="showImg">
      <!-- 轮播图片 -->
      <img @mouseover="changeInterval(true)" @mouseleave="changeInterval(false)" v-for="(item) in imgArr" :key="item.id"
        :src="item.url" alt="暂无图片" v-show="item.id===currentIndex">
      <!-- 左侧按钮 -->
      <div @click="clickIcon('up')" class="iconDiv icon-left">
        <i class="el-icon-caret-left"></i>
      </div>
      <!-- 右侧按钮 -->
      <div @click="clickIcon('down')" class="iconDiv icon-right">
        <i class="el-icon-caret-right"></i>
      </div>
      <!-- 控制圆点 -->
      <div class="banner-circle">
        <ul>
          <li @click="changeImg(item.id)" v-for="(item) in imgArr" :key="item.id"
            :class="item.id === currentIndex ? 'active' : ''"></li>
        </ul>
      </div>
    </div>



    <div class="about-bottom">

      <!-- 活动报名 -->
      <div class="about-topgrid1">
        <div style="text-align:right">

          <a>
            <h3>活动报名</h3>
          </a>

          <!-- stripe去掉 后斑马线无     color: 'orange' -->
          <div class="mytable">
            <el-table :row-style="{ fontSize: '15px', fontFamily: '华文楷体', color: '#7e5b23' }" :data="tableDataactivity"
              :header-cell-style="{ textAlign: 'center', background: 'whitesmoke' }"
              :cell-style="{ textAlign: 'center', background: 'whitesmoke' }"
              style="margin-top: 10px; margin-left: 180px; ">

              <!-- label="活动名称" -->
              <el-table-column prop="name" width="150" style="color: coral">
                <!-- 利用插槽改单列颜色 -->
                <template slot-scope="scope">
                  <div :style="{ color: scope.row.name ? 'gray' : 'gray' }">
                    {{ scope.row.name }}
                  </div>
                </template>
              </el-table-column>
              <!-- label="活动描述和内容" -->
              <el-table-column prop="description" width="0">
              </el-table-column>

            </el-table>
          </div>

        </div>
      </div>

      <div class="about-histore">
        <h3 style="text-align:right">社团招新专栏</h3>

        <div class="mytable">
          <!-- headerBg是表格头部的样式，这里还未设置 -->
          <el-table :row-style="{ fontSize: '15px', fontFamily: '华文楷体' }" :data="tableDataclub"
            :header-cell-style="{ textAlign: 'center', background: 'whitesmoke' }"
            :cell-style="{ textAlign: 'center', background: 'whitesmoke' }"
            style="margin-top: 20px; margin-left: 200px; margin-right: 0px ">

            <!-- <el-table-column prop="name" label="社团名称" width="80"> -->
            <el-table-column prop="name" width="120">

            </el-table-column>

            <!-- <el-table-column prop="describe" label="社团招新信息" width="150"> -->
            <el-table-column prop="news" width="410">
              <!-- 利用插槽改单列颜色 -->
              <template slot-scope="scope">
                <div :style="{ color: scope.row.news ? '#4d78c2' : '#4d78c2' }">
                  {{ scope.row.news }}
                </div>
              </template>
            </el-table-column>

          </el-table>
        </div>


      </div>

    </div>




    <!-- 第二行 -->
    <div>
      <div class="wrap">
        <div class="about">


          <!-- 热门社团 -->
          <div>
            <div class="col">
              <h3 style="text-align:center">热门社团</h3>

              <div class="mytable">
                <el-table :row-style="{ fontSize: '15px', fontFamily: '华文楷体', height: '150px' }" :data="tableDataclub"
                  :header-cell-style="{ textAlign: 'center', background: 'whitesmoke' }"
                  :cell-style="{ textAlign: 'center', background: 'whitesmoke' }">


                  <!-- <el-upload class="avatar-uploader" action=logo :on-success="handleAvatarSuccess">
                    <img v-if="tableDataclub.avatarUrl" :src="tableDataclub.avatarUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload> -->


                  <el-table-column prop="name" label="社团名称" width="140">
                    <template slot-scope="scope">
                      <div :style="{ fontWeight: scope.row.name ? '700' : '700' }">
                        {{ scope.row.name }}
                      </div>
                    </template>
                    <!-- <template slot-scope="scope">
                      <div :style="{ color: scope.row.name ? '#264f4d' : '#264f4d' }">
                        {{ scope.row.name }}
                      </div>
                    </template> -->
                  </el-table-column>
                  <!-- <el-table-column prop="logo" label="社团logo">
                  </el-table-column> -->
                  <el-table-column prop="level" label="星级" width="120">
                  </el-table-column>
                  <!-- <el-table-column prop="logo" label="logo" width="120">
                    <img v-if="tableDataclub.avatarUrl" :src="logo" class="avatar">
                  </el-table-column> -->
                  <el-table-column prop="introduction" label="社团介绍" width="450">
                    <template slot-scope="scope">
                      <div :style="{ color: scope.row.name ? '#113038' : '#113038' }">
                        {{ scope.row.introduction }}
                      </div>
                    </template>
                  </el-table-column>

                </el-table>
              </div>

            </div>
          </div>

          <!-- 活动预告 -->
          <div class="col2 span_1_of_about1">
            <h3 style="text-align:center">活动预告</h3>
          </div>

          <div class="mytable" style="margin-top: 102px; margin-left: 200px; margin-right: 0px;">
            <el-table
              :row-style="{ fontSize: '20px', fontFamily: '华文楷体', fontWeight: '700', height: '100px', color: '#264f4d' }"
              :data="tableDataactivity" :header-cell-style="{ textAlign: 'center', background: 'whitesmoke' }"
              :cell-style="{ textAlign: 'center', padding: '0px', background: 'whitesmoke' }" style="width: 220px">

              <el-table-column prop="name" min-width="50%">
              </el-table-column>

            </el-table>
          </div>


        </div>

      </div>

      <!-- <div class="about-services">
      </div> -->
      <div class="clear"></div>


    </div>


    <div class="footer">
      <div class="wrap">
        <div class="footer-top">
          <div class="col_1_of_4 span_1_of_4">
            <h3>关于我们</h3>
            <ul class="first">
              <li>
                <a href="#">关于网站</a>
              </li>
              <li>
                <a href="#">隐私政策</a>
              </li>
              <li>
                <a href="#">服务协议</a>
              </li>
            </ul>
          </div>
          <div class="col_1_of_4 span_1_of_4">
            <h3>友情链接</h3>
            <ul class="first">
              <li>
                <a href="#https://www.hdu.edu.cn/">学校官网</a>
              </li>
              <li>
                <a href="#https://www.hdu.edu.cn/">校团委</a>
              </li>
            </ul>
          </div>
          <div class="col_1_of_4 span_1_of_4">
            <h3>登录/注册</h3>
            <div style=" text-align: left">
              <el-button index="/login" style="margin-left: 25px; margin-bottom: 25px; margin-top: 15px;"
                @click="gologin">
                登录
              </el-button>
            </div>
            <div style=" text-align: left">
              <el-button index="/login" style="margin-left: 25px;" @click="goregister">
                注册
              </el-button>
            </div>
          </div>
          <div class="col_1_of_4 span_1_of_4 footer-lastgrid">
            <h3>联系我们</h3>
            <ul class="follow_icon">
              <li>
                <a href="#">
                  <img src="@/assets/qq.png" alt="" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="@/assets/wx.png" alt="">
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="@/assets/wb.png" alt="">
                </a>
              </li>
            </ul>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script>

import '../assets/frontstyle.css'

export default {
  name: "Front",
  data() {

    return {
      tableDataclub: [],
      tableDataactivity: [],



      currentIndex: 0,//当前所在图片下标
      timer: null,//定时轮询
      imgArr: [
        {
          id: 0,
          url: require('../assets/活动---1024程序节.png'),
        }, {
          id: 1,
          url: require('../assets/活动---百团大战.png'),
        }, {
          id: 2,
          url: require('../assets/活动---实验室.png'),
        }, {
          id: 3,
          url: require('../assets/活动---IB积分.png'),
        }],





      // dataclub: [],
      // dataactivity: [],

      // tableDataclub: [{
      //   name: '杭电助手',
      //   level: '02',
      //   news: '2022招新|乘风载梦·杭电助手招新季来啦',
      //   introduction: '杭电助手是校党委学工办下属校级组织，主要负责微信公众账号的开发运营与维护， 为学校师生提供科技服务。服务号关注人数超过四万，订阅号关注人数超过两万。 2014年5月4日，杭电助手荣获杭州电子科技大学梦想七色花年度青春榜样。'
      // }, {
      //   name: '校青年通讯社',
      //   level: '05',
      //   news: '【校青年通讯社】浩瀚无垠的星空，就此启航',
      //   introduction: '杭州电子科技大学青年通讯社（简称青通）是校团委直属的官方媒体窗口, 负责管理运营杭州电子科技大学团委官方微信、微博、网站、b站和抖音， 并负责 “十佳媒体之星”评选，直击校园晚会赛事活动，网罗校园团学资讯，传播最正青春能量。'
      // }, {
      //   name: '校社团联合会',
      //   level: '03',
      //   news: '杭电青协 | 这场永不落幕的志愿之旅，我想和你一起走下去',
      //   introduction: '学生社团联合会（简称杭电社联）成立于2003年9月，是在校党委领导和校团委指导下，全校各学生社团利益的忠实代表。 杭电社联的主要职责在于管理、协调杭州电子科大学的各个学生社团，统一其活动步伐，并努力为社团搭建活动平台， 促进所有社团健康成立，从而进一步促进校园文化发展和繁荣。'
      // }, {
      //   name: '校学生科技协会',
      //   level: '03',
      //   news: '2022招新·校学生科技协会',
      //   introduction: '杭州电子科技大学学生科技协会（简称校科协）不仅承办大大小小的科技类竞赛， 还会为协会内部的同学创造条件与机会，亲身参与到比赛中去，为培养出优秀参赛团队做出贡献。'
      // }, {
      //   name: '校学生会',
      //   level: '03',
      //   news: '社团招新|【校学生会】我在等你',
      //   introduction: '杭州电子科技大学学生委员会，成立于1992年，它是在杭州电子科技大学党委员会直接领导和共青团委员会指导帮助下的， 代表广大同学利益的自治学生群众组织。在保持最广泛的群众性和组织系统的独立性的同时， 坚持“自我教育、自我管理和自我服务”的原则，全心全意为学生服务。'
      // }, {
      //   name: '校艺术团',
      //   level: '03',
      //   news: '【杭电天协】浩瀚无垠的星空，就此启航',
      //   introduction: '杭州电子科技大学大学生艺术团，是由具有一定文艺基础并热爱艺术的在校大学生组成的群众性文化团体， 是大学生进行艺术实践的园地，是学校让大家放松的重要方式之一。 艺术团以“弘扬民族文化，倡导高雅艺术”为宗旨，着力提高大学生艺术修养，丰富校园文化生活，宣传学校改革发展成果。'
      // }],

      // tableDataactivity: [{
      //   name: '快乐的小马儿',
      //   description: ' 理学院⭐物理夏令营'
      // }, {
      //   name: 'Any',
      //   description: ' 志愿者培训会'
      // }, {
      //   name: '冷冷冷',
      //   description: ' 校科协竞赛培训会'
      // }, {
      //   name: '羊羊羊',
      //   description: '  实验室知识竞赛'
      // }]
    }
  },
  created() {
    this.loadclub()
    this.loadactivity()
  },
  methods: {
    loadclub() {
      this.request.get("/club").then(res => {
        // console.log(res.data[0]);
        // console.log(res.data);
        this.tableDataclub = res.data;     //去掉.records
        dataclub = this.tableDataclub;
        console.log(dataclub[0]);
        console.log(dataclub[1]);
        console.log(dataclub);
      })
    },
    loadactivity() {
      this.request.get("/activity").then(res => {
        this.tableDataactivity = res.data;    //去掉.records
        dataactivity = this.tableDataactivity
      })
    },
    gologin() {
      this.$router.push("/login")
      localStorage.removeItem("front")
      this.$message.success("进入登录页面成功")
    },
    goregister() {
      this.$router.push("/register")
      localStorage.removeItem("front")
      // localStorage.removeItem("user")
      this.$message.success("进入注册页面成功")
    },



    //开启定时器
    startInterval() {
      // 事件里定时器应该先清除在设置，防止多次点击直接生成多个定时器
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex > this.imgArr.length - 1) {
          this.currentIndex = 0
        }
      }, 4000)
    },
    // 点击左右箭头
    clickIcon(val) {
      if (val === 'down') {
        this.currentIndex++;
        if (this.currentIndex === this.imgArr.length) {
          this.currentIndex = 0;
        }
      } else {
        if (this.currentIndex === 0) {
          this.currentIndex = this.imgArr.length;
        }
        this.currentIndex--;
      }
    },
    // 点击控制圆点
    changeImg(index) {
      this.currentIndex = index
    },
    //鼠标移入移出控制
    changeInterval(val) {
      if (val) {
        clearInterval(this.timer)
      } else {
        this.startInterval()
      }
    }
  },
  //进入页面后启动定时轮询
  mounted() {
    this.startInterval()
  }

}
</script>
  
  
  
  
<style scoped>
#app {
  height: 100%
}

.mytable>>>.el-table__row>td {
  border: none;
  /* border-color: rgb(175, 118, 19); */
}

/* 下划线 */
.mytable>>>.el-table th.is-leaf {
  /* border: none; */
  border-color: rgb(175, 118, 19);
}

.mytable>>>.el-table::before {
  /* 去除下边框 */
  height: 0;
}




/* 轮滑图css */

/* 清除li前面的圆点 */
li {
  list-style-type: none;
}

.showImg {
  position: relative;
  width: 60%;
  height: 450px;
  margin: auto;
  overflow: hidden;
}

/* 轮播图片 */
.showImg img {
  width: 100%;
  height: 100%;
}

/* 箭头图标 */
.iconDiv {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border: 1px solid #666;
  border-radius: 15px;
  background-color: rgba(125, 125, 125, .2);
  line-height: 30px;
  text-align: center;
  font-size: 25px;
  cursor: pointer;
}

.iconDiv:hover {
  background-color: white;
}

.icon-left {
  left: 10px;
}

.icon-right {
  right: 10px;
}

/* 控制圆点 */
.banner-circle {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
}

.banner-circle ul {
  margin: 0 50px;
  height: 100%;
  text-align: right;
}

.banner-circle ul li {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 0 5px;
  border-radius: 7px;
  background-color: rgba(125, 125, 125, .8);
  cursor: pointer;
}

.active {
  background-color: black !important;
}



.avatar {
  width: 138px;
  height: 138px;
  display: block;
}
</style>