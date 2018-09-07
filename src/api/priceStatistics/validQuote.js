import request from '@/utils/request'
import { root } from '@/api/index'

/* 查询所有列表*/
export function findAll(page, size) {
  return request({
    url: `${root}/price/findMonitorCrop/${page}/${size}`,
    method: 'get'
  })
}
/* 条件查询*/
export function conditionFind(page, size, queryObj) {
  if (queryObj.startDate == null) { queryObj.startDate = '' }
  if (queryObj.endDate == null) { queryObj.endDate = '' }
  return request({
    url: `${root}/price/findMonitorCrop/${page}/${size}?cropId=` + queryObj.cropId + `&monitorId=` + queryObj.monitorId + `&startDate=` + queryObj.startDate + `&endDate=` + queryObj.endDate,
    method: 'get'
  })
}
/* 查询所有监测点*/
export function findMonitor() {
  return request({
    url: `${root}/monitor/findMakeOffers`,
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
