import request from '@/utils/request'
import { root } from '@/api/index'

/* 查询所有列表*/
export function findAll(page, size) {
  return request({
    url: `${root}/price/findByCrop/${page}/${size}`,
    method: 'get'
  })
}
/* 条件查询*/
export function conditionFind(page, size, queryObj) {
  if (queryObj.startDate == null) { queryObj.startDate = '' }
  if (queryObj.endDate == null) { queryObj.endDate = '' }
  return request({
    url: `${root}/price/findByCrop/${page}/${size}?cropId=` + queryObj.cropId + `&startDate=` + queryObj.startDate + `&endDate=` + queryObj.endDate,
    method: 'get'
  })
}
/* 查询所有品种*/
export function findVariety() {
  return request({
    url: `${root}/crop/findAll`,
    method: 'get'
  })
}
/* 查看詳情*/
export function check(thisId) {
  return request({
    url: `${root}/price/findById?id=` + thisId,
    method: 'get'
  })
}
