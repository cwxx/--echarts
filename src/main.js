import Vue from 'vue';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/styles/common.scss';

// import basicContainer from 'components/basic-container/main'

Vue.config.productionTip = false;

Vue.use(VueCookies);
// 注册全局容器
// Vue.component('basicContainer', basicContainer);

// // 注册全局echarts
// Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
