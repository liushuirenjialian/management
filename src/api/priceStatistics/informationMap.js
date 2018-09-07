import request from '@/utils/request'
import { root } from '@/api/index'
/* 价格走势图*/
export function getData(thisId, sDate, eDate) {
  return request({
    url: `${root}/price/findByCropForGraph?cropId=` + thisId + '&endDate=' + eDate + '&startDate=' + sDate,
    method: 'get'
  })
}
