import request from '@/utils/request'
import { root } from '@/api/index'
/* 查询所有列表  周评列表*/
export function findAll(page, size) {
  return request({
    url: `${root}/week/findAll/${page}/${size}`,
    method: 'get'
  })
}
/* 根据标题   查找周评列表  */
export function condition(page, size, monitortitle) {
  return request({
    url: `${root}/week/findByTitle/${page}/${size}?title=` + monitortitle,
    method: 'get'
  })
}
/* 通过*/
export function pass(thisId) {
  return request({
    url: `${root}/week/audit?id=` + thisId + '&auditCode=1',
    method: 'post'
  })
}
/* 不通过*/
export function noPass(thisId) {
  return request({
    url: `${root}/week/audit?id=` + thisId + '&auditCode=2',
    method: 'post'
  })
}
