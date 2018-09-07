import request from '@/utils/request'
import { root } from '@/api/index'

/* accountBaseInfo/findByPage/{page}/{size}
查询所有企业*/
export function obtain(obj, ids, isDeleteder) {
  return request({
    url: `${root}/accountBaseInfo/findByPage/${obj.page}/${obj.size}`,
    method: 'post',
    data: {
      // id:ids,
      isDeleted: 0,
      submitNum: 1,
      statusCode: null
    }
  })
}
// 变更审核列表
export function changeList(obj, ids, isDeleteder) {
  return request({
    url: `${root}/accountBaseInfo/findByPage/${obj.page}/${obj.size}`,
    method: 'post',
    data: {
      // id:ids,
      isDeleted: 0,
      submitNum: 5,
      statusCode: null
    }
  })
}
/* 搜索*/
export function sousu(obj, ids, isDeleteder, datas) {
  return request({
    // url: `${root}/accountBaseInfo/findByPage/${obj.page}/${obj.size}`,
    url: `${root}/accountBaseInfo/findByPage/${obj.page}/${obj.size}`,
    method: 'post',
    data: datas
  })
}

// 查看企业信息 审核接口
export function see(id) {
  return request({
    url: `${root}/accountBaseInfo/findById?id=${id}`,
    method: 'get'
  })
}

// 审核企业  通过  驳回
export function updata(status, obgId) {
  return request({
    url: `${root}/accountBaseInfo/changeStatus/${obgId}/${status}`,
    method: 'get'
  })
}

// 查看企业提交审批变更记录
export function change(id) {
  return request({
    url: `${root}/accountBaseInfo/findRecordById?id=${id}`,
    method: 'get'
  })
}
// 查看历史变更详情
export function biangenglist(id) {
  return request({
    url: `${root}/accountBaseInfo/findRecordDetailById?id=${id}`,
    method: 'get'
  })
}

// 下载文件
export function downloadlist(imgPath) {
  return request({
    url: `${root}/accountBaseInfo/downFile?path=${imgPath}`,
    method: 'post'
  })
}
