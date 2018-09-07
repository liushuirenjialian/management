import { root } from '@/api/index'

import request from '@/utils/request'

// 列表展示
export function page(query, form) {
  return request({
    url: `${root}/declare/findByPage/${query.page}/${query.size}/?range=${query.range}&change=${query.change}&id=1`,
    method: 'post',
    data: JSON.stringify(form)
  })
}

// 搜索
export function pageOption(query, form) {
  return request({
    url: `${root}/declare/findByPage/${query.page}/${query.size}?range=${query.range}&change=${query.change}&id=1`,
    method: 'post',
    data: JSON.stringify(form)
  })
}

// 受理
export function acceptOption(id) {
  return request({
    url: `${root}/declare/accept?id=${id}`,
    method: 'post'
  })
}

// 驳回
export function overruleOption(id, state) {
  return request({
    url: `${root}/declare/audit?id=${id}&state=${state}`,
    method: 'post'
  })
}

export function getObj(id) {
  return request({
    url: `${root}/declare/findById?id=${id}`,
    method: 'get'
  })
}
