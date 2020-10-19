import axios from 'axios';
import store from '../store';
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // 一遇到到'/api'就会代理到vue.config.js中的跨域地址
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // 请求超时时间
});

// request拦截器
// 每次请求都为http头增加Authorization字段，其内容为Token
service.interceptors.request.use(
  (config) =>
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.common['Authorization'] = token;
    // }
    config,
  (error) =>
    // Do something with request error
    Promise.reject(error),

);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code === 200) {
      return res.data;
    }
    if (res.code === 401) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000,
      });
      window.location.href = '/login';
    }
    return Promise.reject(data);
  }, (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);
export default service;
