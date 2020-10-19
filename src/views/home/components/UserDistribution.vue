<template>
  <div id="user-distribution" style="height: 90%;"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'UserDistribution',
  data() {
    return {
      data: [23,43,32,44,67,60,80,56,40],
      dataY: ['山东菏泽农业大厅','山西农协会','上海粮食总局','四川米多粮公司','深圳多米诺公司','意大利米多宝团陕西分公司','云南米公司'],
    }
  },
  mounted() {
    const myEcharts = echarts.init(document.getElementById('user-distribution'));
    const options =  {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
          left: '2%',
          right: '2%',
          top: '10%',
          containLabel: true,
          bottom: '4%'
        },
        xAxis: {
          type: 'value',
          
          name: '客户',
          nameTextStyle: {
            fontStyle: 'italic'
          },
          
          axisTick: {
              alignWithLabel: true
          },
          // 修改刻度标签
          axisLabel: {
            color: 'rgba(255,255,255,.6)',
            fontSize: '12',
          },
          // 不显示x坐标轴的样式
          axisLine: {
            show: false,
          }
        }, 
        yAxis: {
          type: 'category',
          axisLabel: {
            color: 'rgba(255,255,255,.6)',
            fontSize: '12',
          },
          // 显示y坐标轴的样式
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255, 0.1)',
            }
             
          },
          data: this.dataY,
        },
        series: [
          {
            name: '客户设备数量',
            type: 'bar',
            barWidth: '50%',
            data: this.data
          }
        ]
    }
    myEcharts.setOption(options, true);
    // 根据屏幕自适应
    window.addEventListener("resize",function(){
      myEcharts.resize();
    })
  },
  methods: {},
};
</script>

<style scoped>
#user-distribution {
  display: block;
}
</style>
