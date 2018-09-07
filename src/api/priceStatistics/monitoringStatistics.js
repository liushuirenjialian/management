import request from '@/utils/request'
import { form } from '@/api/index'
import { rootUser } from '@/api/index'
// 获取I报表的ID
export function getIid(Icode) {
  return request({
    url: `${rootUser}/irpt/find/${Icode}`,
    method: 'get',
    data: ''
  })
}
// 获取I报表
export function getI(uId, Iid) {
  return request({
    url: `${form}/sso/companytooa/${uId}/${Iid}`,
    method: 'get',
    data: ''
  })
}

// import { root } from '@/api/index'

/* 查询所有列表*/
// export function findAll(page, size) {
// return request({
//  url: `${root}/price/findMonitorCount/${page}/${size}`,
//  method: 'get'
// })
// }
/* 条件查询列表*/
// export function findCondition(page, size, Id) {
// return request({
//  url: `${root}/price/findMonitorCount/${page}/${size}?monParentId=` + Id,
//  method: 'get'
// })
// }
/* 查询所有品种*/
// export function findVariety() {
// return request({
//  url: `${root}/crop/findAll`,
//  method: 'get'
// })
// }
/* 导出表格*/
// export function exportTable() {
// return request({
//  url: `${root}/excel/down`,
//  method: 'get'
// })
// }
