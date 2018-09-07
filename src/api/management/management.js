import request from '@/utils/request'

import {
  root
} from '@/api/index'

/* 列表页显示 接口*/
export function obtain(obj) {
  return request({
    url: `${root}/notice/find/${obj.page}/${obj.size}`,
    method: 'get'
  })
}
/* 查询   接口*/
export function chazhao(page, size, queryObj) {
  if (queryObj.startTime == null) {
    queryObj.startTime = ''
  }
  if (queryObj.failureTime == null) {
    queryObj.failureTime = ''
  }
  return request({
    url: `${root}/notice/find/${page}/${size}?title=` + queryObj.title + `&startTime=` + queryObj.startTime +
			`&failureTime=` + queryObj.failureTime + `&notStatus=` + queryObj.notStatus,
    method: 'get'
  })
}
/* 公告管理   添加   接口*/
export function Newlyadd(userId) {
  return request({
    url: `${root}/notice/findByUserId?userId=` + userId,
    method: 'get'
  })
}
/* 公告管理 保存  接口*/
export function add(obj) {
  return request({
    url: `${root}/notice/save`,
    method: 'post',
    data: JSON.stringify(obj)
  })
}

/* 根据id获取公告*/
export function preview(thisId) {
  return request({
    url: `${root}/notice/findById?id=` + thisId,
    method: 'get'
  })
}
/* 更新公告状态（0-无效 1-有效）   撤销发布 接口*/
// export function toupdate(obgId,status) {
//   return request({
//     // url: `${root}/notice/updateNotStatus?notStatus=`+status ,
//     url: `${root}/notice/updateNotStatus?notStatus=` + status + '&id=' + obgId,
//     method: 'post'
//   })
// }
// 撤销发布
export function toupdate(id) {
  return request({
    // url: `${root}/notice/updateNotStatus?notStatus=`+status ,
    url: `${root}/notice/delete?id=` + id,
    method: 'post'
  })
}
