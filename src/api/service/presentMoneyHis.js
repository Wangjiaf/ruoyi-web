import request from '@/utils/request'

// 查询礼金历史记录列表
export function listPresentMoneyHis(query) {
  return request({
    url: '/service/presentMoneyHis/list',
    method: 'get',
    params: query
  })
}

// 查询礼金历史记录详细
export function getPresentMoneyHis(id) {
  return request({
    url: '/service/presentMoneyHis/' + id,
    method: 'get'
  })
}

// 新增礼金历史记录
export function addPresentMoneyHis(data) {
  return request({
    url: '/service/presentMoneyHis',
    method: 'post',
    data: data
  })
}

// 修改礼金历史记录
export function updatePresentMoneyHis(data) {
  return request({
    url: '/service/presentMoneyHis',
    method: 'put',
    data: data
  })
}

// 删除礼金历史记录
export function delPresentMoneyHis(id) {
  return request({
    url: '/service/presentMoneyHis/' + id,
    method: 'delete'
  })
}
