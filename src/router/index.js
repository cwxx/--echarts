import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index'),
  },

  {
    path: '/404',
    component: () => import('@/components/error-page/404.vue'),
    hidden: true,
  },
];
const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_API,
  routes,
});
// 路由跳转之前,路由拦截
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login' && !localStorage.token) {
//     return next('/login');
//   }
//    next()
// })

export default router;
