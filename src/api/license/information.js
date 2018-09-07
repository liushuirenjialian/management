import { root } from '@/api/index'

import request from '@/utils/request';

// 列表展示
export function page(query,form) {
  return request({
    url: `${root}/declare/findLicensePage/${query.page}/${query.size}?range=${query.range}`,
    method: 'post',
    data: JSON.stringify(form)
  });
}

// 搜索
export function pageOption(query,form) {
    return request({
      url: `${root}/declare/findLicensePage/${query.page}/${query.size}`,
      method: 'post',
      data: JSON.stringify(form)
    });
  }
