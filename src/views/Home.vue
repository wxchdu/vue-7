<template>
    <div>
      <el-row>
        <el-col :span="12">
          <div id="main" style="width: 500px; height: 400px;"></div>
        </el-col>
        <el-col :span="12">
          <div id="pie" style="width: 500px; height: 400px"></div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default{
    name: "Home",
    data(){
        return{
        }
    },
    mounted(){  //页面元素渲染之后再触发
      var option = {
  xAxis: {
    title: {
    text: '各星级社团统计',
    subtext: '柱状图',
    left: 'center'
  },
    type: 'category',
    data: ["一星级社团", "二星级社团", "三星级社团", "四星级社团", "五星级社团"]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar'
    }
  ]
};


//饼图


var pieOption = {
  title: {
    text: '各星级社团统计',
    subtext: '比例图',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      type: 'pie',
      radius: '60%',
      data: [],// 填空
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};


    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);


    var pieDom = document.getElementById('pie');
    var pieChart = echarts.init(pieDom);


  this.request.get("/echarts/clubs_level").then(res =>{
    //填空
    //option.xAxis.data = res.data.x
    option.series[0].data = res.data
    //option.series[1].data = res.data
    //数据准备完毕之后再set
    myChart.setOption(option);
  })

  this.request.get("/echarts/clubs_population").then(res =>{
      for (let i = 0; res.data.x[i] != null; i++) {
             pieOption.series[0].data.push({name:res.data.x[i], value: res.data.y[i]});//给饼图赋值数据
      }
      pieChart.setOption(pieOption)
  })

}
}
</script>

<style scoped>

</style>