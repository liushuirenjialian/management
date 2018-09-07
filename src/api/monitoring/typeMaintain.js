import request from '@/utils/request'
import { root } from '@/api/index'
/* url: `${root}/account/login/${page}/${size}`,*/
/* 查询左侧树形和弹框里面的监测点树形*/
export function treeList() {
  return request({
    url: `${root}/org/findAll?findFlag=0`,
    method: 'get'
  })
}
export function tableList(page, size, monitorName) {
  return request({
    url: `${root}/org/findByName/${page}/${size}?orgName=` + monitorName,
    method: 'get'
  })
}
/* 点击左侧树查询表格*/
export function pointList(thisId) {
  return request({
    url: `${root}/org/findById?id=` + thisId,
    method: 'get'
  })
}
/* 添加*/
export function add(obj) {
  return request({
    url: `${root}/org/save`,
    method: 'post',
    data: JSON.stringify(obj)
  })
}
/* 编辑*/
export function update(obj) {
  return request({
    url: `${root}/org/update`,
    method: 'post',
    data: JSON.stringify(obj)
  })
}
/* 删除*/
export function remove(thisId) {
  return request({
    url: `${root}/org/delete?id=` + thisId,
    method: 'post'
  })
}
