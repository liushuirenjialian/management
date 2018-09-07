import request from '@/utils/request'
import { root } from '@/api/index'
/* 查询左侧树形和弹框里面的监测点树形*/
export function treeList() {
  return request({
    url: `${root}/monitor/findAll?findFlag=0`,
    method: 'get'
  })
}
/* 查询表格*/
export function tableList(page, size, monitorName) {
  return request({
    url: `${root}/monitor/findByJcname/${page}/${size}?jcName=` + monitorName,
    method: 'get'
  })
}
/* 点击左侧树查询表格*/
export function pointList(page, size, thisId) {
  return request({
    url: `${root}/monitor/findAccendant/${page}/${size}?id=` + thisId,
    method: 'get'
  })
}
/* 点击查看详情*/
export function detail(objName, objTell) {
  return request({
    url: `${root}/monitor/findJcInfo?jcName=` + objName + '&jcPhone=' + objTell,
    method: 'get'
  })
}
