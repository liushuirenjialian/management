import request from '@/utils/request'

import { root } from '@/api/index'

/* 用户登录*/
export function login(username, password) {
  return request({
    url: `${root}/account/login/${username}/${password}`,
    method: 'post',
    data: ''
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

/* 用户登出*/
export function logout() {
  return request({
    url: `${root}/account/logout`,
    method: 'post'
  })
}

// 编辑==通过id查询信息，返回信息到弹框form表单里面
export function getById(userId) {
  return request({
    url: `${root}/user/findById/${userId}`,
    method: 'get'
  })
}
