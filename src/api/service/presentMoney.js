import request from '@/utils/request'

// 查询礼金汇总列表
export function listPresentMoney(query) {
  return request({
    url: '/service/presentMoney/list',
    method: 'get',
    params: query
  })
}

// 查询礼金汇总详细
export function getPresentMoney(id) {
  return request({
    url: '/service/presentMoney/' + id,
    method: 'get'
  })
}

// 新增礼金汇总
export function addPresentMoney(data) {
  return request({
    url: '/service/presentMoney',
    method: 'post',
    data: data
  })
}

// 修改礼金汇总
export function updatePresentMoney(data) {
  return request({
    url: '/service/presentMoney',
    method: 'put',
    data: data
  })
}

// 删除礼金汇总
export function delPresentMoney(id) {
  return request({
    url: '/service/presentMoney/' + id,
    method: 'delete'
  })
}
