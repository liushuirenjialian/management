import request from '@/utils/request'

import {root} from '@/api/index'

/*用户登录*/
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

/*用户登出*/
export function logout() {
  return request({
    url: `${root}/account/logout`,
    method: 'post'
  })
}
