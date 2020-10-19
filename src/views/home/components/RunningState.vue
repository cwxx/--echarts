<template>
  <div id="running-state" style="height: 100%;"></div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'RunningState',
  data() {
    return {
      data: [
        { value: 100, name: '锁定设备' },
        { value: 233, name: '停止设备' },
        { value: 1002, name: '运行设备' },
      ],
    };
  },
  mounted() {
    const myEcharts = echarts.init(document.getElementById('running-state'));
    const options = {
      color: ['#c23531','#006699', '#99CC33'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}台 ({d}%)',
      },
      
      legend: {
        orient: 'vertical',
        top: '25%',
        right: '0%',
        bottom: '0%',
        orient: 'vertical',
        textStyle: {
          color: 'rgba(255,255,255,.6)'
        },
        data: ['锁定设备', '运行设备', '停止设备'],
      },
      grid: {
        left: '0%',
      },
      series: [
        {
          name: '售出设备状况',
          type: 'pie',
          radius: '55%',
          center: ['40%', '40%'],
          data: this.data,
          emphasis: {
              itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          },
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
              textStyle : {                   
                align : 'center',
                baseline : 'middle',
                fontFamily : '微软雅黑',
                fontWeight : 'bolder'
              }
            },
          },
        }   
    ]
    };
    myEcharts.setOption(options, true);
    // 根据屏幕自适应
    window.addEventListener("resize",function(){
      myEcharts.resize();
    })
  }
};
</script>

<style scoped>
#running-state {
  display: block;
}
</style>
