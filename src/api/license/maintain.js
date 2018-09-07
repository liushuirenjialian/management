import { root } from '@/api/index'

import request from '@/utils/request'

// 列表展示
export function page(query, form) {
  return request({
    url: `${root}/declare/findLicensePage/${query.page}/${query.size}?range=${query.range}`,
    method: 'post',
    data: JSON.stringify(form)
  })
}

// 获取所有地域
export function area(areaId) {
  return request({
    url: `${root}/declare/findAllArea?id=${areaId}`,
    method: 'post',
    data: areaId
  })
}

// 搜索
export function pageOption(query, form) {
  return request({
    url: `${root}/declare/findLicensePage/${query.page}/${query.size}`,
    method: 'post',
    data: JSON.stringify(form)
  })
}

// 吊销
export function revoke(id) {
  return request({
    url: `${root}/declare/revokeLicense?id=${id}`,
    method: 'post'
  })
}

// 变更
export function getObj(id) {
  return request({
    url: `${root}/declare/findById?id=${id}`,
    method: 'get'
  })
}
export function putObj(info) {
  return request({
    url: `${root}/declare/change`,
    method: 'post',
    data: JSON.stringify(info)
  })
}

// 获取粮食局树形信息
export function foodInfo(foodId) {
  return request({
    url: `${root}/bureaus/getTreeData?id=${foodId}`,
    method: 'get',
    data: foodId
  })
}
