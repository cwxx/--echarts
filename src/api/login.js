import request from '@/utils/request';

export function login(data = {}) {
  // 密码登录接口
  return request({
    url: 'admin/user/login',
    method: 'post',
    data,
  });
}
export function logout(data = {}) {
  // 退出登录接口
  return request({
    url: 'admin/user/login',
    method: 'post',
    data,
  });
}
export function getInfo(data = {}) {
  // 获取用户信息
  return request({
    url: 'admin/user/login',
    method: 'post',
    data,
  });
}
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get',
  });
}
