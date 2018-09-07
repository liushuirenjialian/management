import request from '@/utils/request'

import { complex } from '@/api/index'

// iframe
export function reportform(id, url) {
  return request({
    url: `${complex}/sso/companytooa/${id}/${url.command}/${url.rshid}`,
    method: 'get'
  })
}

export function getDetail(userid) {
  return request({
    url: `${complex}/sso/companytooa/${userid}`,
    method: 'get'
  })
}
