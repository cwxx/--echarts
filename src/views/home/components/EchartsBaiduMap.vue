<template>
  <div id="sell-map" style="height: 100%; width: 100%;"></div>
</template>

<script>
import echarts from 'echarts';

import { geoCoordMap, planePath } from '@/assets/map-option.js';

require('echarts/extension/bmap/bmap');
require('echarts/map/js/china.js');

export default {
  name: 'EchartsBaiduMap',
  data() {
    return {
      BJData: [
        [{ name: '北京' }, { name: '上海', value: 95 }],
        [{ name: '北京' }, { name: '广州', value: 90 }],
        [{ name: '北京' }, { name: '大连', value: 80 }],
        [{ name: '北京' }, { name: '南宁', value: 70 }],
        [{ name: '北京' }, { name: '南昌', value: 60 }],
        [{ name: '北京' }, { name: '拉萨', value: 50 }],
        [{ name: '北京' }, { name: '长春', value: 40 }],
        [{ name: '北京' }, { name: '包头', value: 30 }],
        [{ name: '北京' }, { name: '重庆', value: 20 }],
        [{ name: '北京' }, { name: '常州', value: 10 }],
      ],
      SHData: [
        [{ name: '上海' }, { name: '包头', value: 95 }],
        [{ name: '上海' }, { name: '昆明', value: 90 }],
        [{ name: '上海' }, { name: '广州', value: 80 }],
        [{ name: '上海' }, { name: '郑州', value: 70 }],
        [{ name: '上海' }, { name: '长春', value: 60 }],
        [{ name: '上海' }, { name: '重庆', value: 50 }],
        [{ name: '上海' }, { name: '长沙', value: 40 }],
        [{ name: '上海' }, { name: '北京', value: 30 }],
        [{ name: '上海' }, { name: '丹东', value: 20 }],
        [{ name: '上海' }, { name: '大连', value: 10 }],
      ],
      QZData: [
        [{ name: '青州市' }, { name: '福州', value: 95 }],
        [{ name: '青州市' }, { name: '太原', value: 90 }],
        [{ name: '青州市' }, { name: '长春', value: 80 }],
        [{ name: '青州市' }, { name: '重庆', value: 70 }],
        [{ name: '青州市' }, { name: '西安', value: 60 }],
        [{ name: '青州市' }, { name: '成都', value: 50 }],
        [{ name: '青州市' }, { name: '常州', value: 40 }],
        [{ name: '青州市' }, { name: '北京', value: 30 }],
        [{ name: '青州市' }, { name: '北海', value: 20 }],
        [{ name: '青州市' }, { name: '海口', value: 10 }],
      ],
      color: ['#46bee9'],
      series: [],
      
    };
  },
  mounted() {
    const myEcharts = echarts.init(document.getElementById('sell-map'));
    this.initSeries([['青州市', this.QZData]], this);
    const options = {
      backgroundColor: 'transparent',
      
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        top: 'top',
        left: 'left',
        data: ['青州市销售网络'],
        textStyle: {
          color: '#fff',
        },
        selectedMode: 'single',
      },
      geo: {
        zoom: 1.25,
        show: true,
        map: 'china',
        label: {
          show: false,
          color: '#4eac9e',
        },
        roam: true,
        // center: [118.484693, 36.697855],
        itemStyle: {
          areaColor: 'rgba(0, 0, 1, .4)',
          borderColor: 'rgba(255, 255, 255, .4)',
        },

        emphasis: {
          label: {
            show: true,
          },
          itemStyle: {
            areaColor: '#34495e',
          },
        },
      },
      series: this.series,
    };

    myEcharts.setOption(options, true);
    // 根据屏幕自适应
    window.addEventListener("resize",function(){
      myEcharts.resize();
    })
  },
  methods: {
    convertData(data) {
      const res = [];
      for (let i = 0; i < data.length; i++) {
        const dataItem = data[i];
        const fromCoord = geoCoordMap[dataItem[0].name];
        const toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
          });
        }
      }
      return res;
    },
    initSeries(seriesArr, _this) {
      seriesArr.forEach((item, i) => {
        _this.series.push({
          name: `${item[0]} Top10`,
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3,
          },
          lineStyle: {
            normal: {
              color: _this.color[i],
              width: 0,
              curveness: 0.2,
            },
          },
          data: _this.convertData(item[1]),
        },
        {
          name: `${item[0]} Top10`,
          type: 'lines',
          zlevel: 2,
          symbol: ['none', 'arrow'],
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15,
          },
          lineStyle: {
            color: _this.color[i],
            width: 1,
            opacity: 0.6,
            curveness: 0.2,
          },
          data: _this.convertData(item[1]),
        },
        {
          name: `${item[0]} Top10`,
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke',
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
          },
          symbolSize(val) {
            return val[2] / 8;
          },
          itemStyle: {
            color: _this.color[i],
          },
          data: item[1].map((dataItem) => ({
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
          })),
        });
      });
    },

  },
};
</script>

<style>
#sell-map {
  height: 100%; 
  width: 100%;
}
</style>
