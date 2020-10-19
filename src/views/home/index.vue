<template>
  <div class="basic-container" :style="backgroundStyle">
    <header :style="headerBgStyle">
      <h1 class="title">
        瑞良烘干机数据可视化平台
      </h1>
      <span class="real-time">当前时间： {{realTime}} </span>
    </header>
    <div class="main-box">
      <div class="map-panel left-box">
         <h2>设备出售地区分布</h2>
         <div class="map-operation"></div>
         <div class="map-show">
            <div class="map1" :style="map1BgStyle"></div>
            <div class="map2" :style="map2BgStyle"></div>
            <div class="map3" :style="map3BgStyle"></div>
            <div class="map-chart">
              <echarts-baidu-map />
            </div>
            
         </div>
         <div class="panel-footer"></div>
      </div>
     
      <div class="indicator-show">
        <div class="panel" :style="panleBgStyle">
          <h2>近三年销售额统计</h2>
          <div class="charts">
            <sell-list-chart />      
          </div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel" :style="panleBgStyle">
          <h2>售出设备运行状况</h2>
          <div class="charts">
            <running-state /> 
          </div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel" :style="panleBgStyle">
          <h2>客户购买top10</h2>
          <div class="charts">
             <user-distribution />
          </div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import EchartsBaiduMap from './components/EchartsBaiduMap';
import RunningState from './components/RunningState';
import SellListChart from './components/SellListChart';
import UserDistribution from './components/UserDistribution';

export default {
  name: 'Home',
  components: {
    EchartsBaiduMap,
    RunningState,
    SellListChart,
    UserDistribution,
  },
  data() {
    return {
      headerBgStyle: {
        backgroundImage: 'url(' + require('../../assets/image/head_bg.png') + ') '
      },
      panleBgStyle: {
        backgroundImage: 'url(' + require('../../assets/image/line.png') + ') '
      },
      map1BgStyle: {
        backgroundImage: 'url(' + require('../../assets/image/map.png') + ') '
      },
      map2BgStyle: {
        backgroundImage: 'url(' + require('../../assets/image/lbx.png') + ') '
      },
      map3BgStyle: {
        backgroundImage: 'url(' + require('../../assets/image/jt.png') + ') '
      },
      realTime: new Date(),
      timer: null
    };
  },
  mounted() {
    let _this = this;
    this.timer = setInterval( function() {
      _this.realTime =  _this.getCurrentTime()
    }, 1000)
  },
  beforeDestroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    getCurrentTime() {
      const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const timeOptions = {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
      };
      return (new Date()).toLocaleString('zh',{ ...timeOptions, ...dateOptions });
    }
  }
};
</script>
<style scoped>
  .map-show {
    position: relative;  
    /* 11.625 + 0.1875*2 */
    height: 12rem;
  }
  .map-show .map1,
  .map-show .map2,
  .map-show .map3 {
    position: absolute;
    background-size: 100% 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .map-show .map1 {
    opacity: 0.3;   
    width: 6.475rem;
    height: 6.475rem;    
  }
  .map-show .map2 { 
    opacity: 0.6;
    width: 8.0375rem;
    height: 8.0375rem;  
    animation: rotate1 15s linear infinite;
  }
  .map-show .map3 {   
    opacity: 0.6;   
    width: 7.075rem;
    height: 7.075rem;
    animation: rotate 10s linear infinite;
  }
  .map-show .map-chart {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    height: 10.125rem;
    width: 100%;
  }
  .map-panel {

  }
  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
</style>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.basic-constainer {
  overflow:hidden;
  // height: 100vh;
  background: aquamarine;
  position: relative;
}
header {
  height: 1.25rem;
  line-height: 1.25rem;
  // background-color: rgba(255, 255, 255, 0.04);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  .title {
    height: 1.25rem;
    color: #fff;
    font-size: .45rem;
    text-align: center;
  }
  .real-time {
    position: absolute;
    bottom: 0.2rem;
    right: .375rem;
    line-height: 0.9375rem;
    color: rgba(255,255,255,0.7);
    font-size: 0.25rem;
  }
}
.main-box {
  max-width: 1920px;
  min-width: 1024px;
  margin: 0 auto;
  padding: .125rem .125rem 0;
  display: flex;
  .left-box {
    flex: 4;
    margin: 0 0.125rem 0.1875rem;
   
    overflow: hidden;
  }
  
  .indicator-show {
    flex: 2;
    
  }
  .map-panel {
    height: 12rem !important;
  }
  .panel,.map-panel {
    position: relative;
    border: 1px solid rgba(25, 186, 139, 0.17);
    height: 3.875rem;
    width: 8rem;
    padding: 0 0.5rem 0.1875rem ;
    margin-bottom: 0.1875rem;
    background-color: rgba(255, 255, 255, 0.04);
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid #46bee9;
      border-top: 2px solid #46bee9;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-right: 2px solid #46bee9;
      border-top: 2px solid #46bee9;
    }
    .panel-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 10px;
        height: 10px;
        border-left: 2px solid #46bee9;
        border-bottom: 2px solid #46bee9;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid #46bee9;
        border-bottom: 2px solid #46bee9;
      }
    }
    h2 {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.25rem;
      font-weight: 400;
      color: #fff;
      text-align: center;
    }
    .charts {
      height: 100%;
    }
  }
}



</style>
