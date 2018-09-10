import { User } from '@/api/index'

import request from '@/utils/request'

// 登录
export function login(name, password) {
  return request({
    url: `${User}/user/login/${name}/${password}`,
    method: 'post'
  })
}

// 登出
export function logout(token) {
  return request({
    url: `${User}/user/logout`,
    method: 'post',
    params: { token }
  })
}

/* --------------获取左侧导航栏和平台列表----------------*/
export function getInfo(userId) {
  return request({
    url: `${User}/guide/findByUserId?id=${userId}`,
    method: 'get'
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/api/admin/user/front/info',
//     method: 'get',
//     params: { token }
//   });
// }

// 编辑==通过id查询信息，返回信息到弹框form表单里面
export function getById(userId) {
  return request({
    url: `${User}/user/findById/${userId}`,
    method: 'get'
  })
}

// 更新用户信息
export function putObj(userObj) {
  return request({
    url: `${User}/user/update`,
    method: 'post',
    data: JSON.stringify(userObj)
  })
}

/* -----------------修改密码-----------------------*/
export function updataPassword(data) {
  return request({
    url: `${User}/user/updatePassword`,
    method: 'post',
    data: data
  })
}

// 获取省份信息
export function provinceInfo() {
  return request({
    url: `${User}/menu/getProvince`,
    method: 'get'
  })
}

/* 侧导航栏----------------*/
export function getSiderBarInfo(userId, menuid) {
  return request({
    url: `${User}/guide/findByUserId/${menuid}/${userId}`,
    // /menu/getBasePlatform/{id}
    // url: `${User}/guide/findByUserId/${userId}/${menuid}`,
    method: 'get'
  })
}
// export function getAllMenus() {
//   return request({
//     url: '/loginapi/admin/user/front/menu/all',
//     method: 'get'
//   });
// }
