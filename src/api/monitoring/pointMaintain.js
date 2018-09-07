import request from '@/utils/request'
import { root } from '@/api/index'
/* 查询左侧树形和弹框里面的监测点树形*/
export function treeList() {
  return request({
    url: `${root}/monitor/findAll?findFlag=0`,
    method: 'get'
  })
}
/* 查询弹框里面维护人树形*/
// export function userTreeList() {
// return request({
//  url: `${root}/org/findAll`,
//  method: 'get'
// })
// }
/* 查询表格*/
export function tableList(page, size, monitorName) {
  return request({
    url: `${root}/monitor/findByName/${page}/${size}?name=` + monitorName,
    method: 'get'
  })
}
/* 点击左侧树查询表格*/
export function pointList(thisId) {
  return request({
    url: `${root}/monitor/findById?id=` + thisId,
    method: 'get'
  })
}
/* 添加*/
export function add(obj) {
  return request({
    url: `${root}/monitor/save`,
    method: 'post',
    data: JSON.stringify(obj)
  })
}
/* 编辑*/
export function update(obj) {
  return request({
    url: `${root}/monitor/update`,
    method: 'post',
    data: JSON.stringify(obj)
  })
}
/* 删除*/
export function remove(thisId) {
  return request({
    url: `${root}/monitor/delete?id=` + thisId,
    method: 'post'
  })
}
