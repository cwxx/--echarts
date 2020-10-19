<template>
  <div id="sell-list" style="height: 90%;"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'SellListChart',
  data() {
    return {
      options: {
        color: ['#46bee9','#61a0a8','#006699'],
        legend: {
          orient: 'vertical',
          top: '0%',
          right: '0%',
          bottom: '0%',
          textStyle: {
            color: 'rgba(255,255,255,.6)'
          }
        },
        tooltip: {},
        grid: {
          left: '0%',
          right: '20%',
          top: '15%',
          containLabel: true,
          bottom: '4%'
        },
        dataset: {
            source: [
                ['product', '2018年', '2019年', '2020年'],
                ['第一季度', 43.3, 85.8, 93.7],
                ['第二季度', 83.1, 73.4, 55.1],
                ['第三季度', 86.4, 65.2, 82.5],
                ['第四季度', 72.4, 53.9, 39.1]
            ]
        },
        xAxis: {
          type: 'category',
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
          name:'万元',
          nameLocation: "end",    
          nameTextStyle: {
            color: 'rgba(255,255,255,.6)',
          },
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
          
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'}
        ]
      }
    }
  },
  mounted() {
    const myEcharts = echarts.init(document.getElementById('sell-list'));
    
    myEcharts.setOption(this.options, true);
    // 根据屏幕自适应
    window.addEventListener("resize",function(){
      myEcharts.resize();
    })
  },
  methods: {}
}
</script>

<style scoped>

</style>
