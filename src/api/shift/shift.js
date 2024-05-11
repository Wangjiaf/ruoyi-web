import request from '@/utils/request'

export function listShift() {
  return request({
    url: '/shift/listShift',
    method: 'get'
  })
}

export function doShift() {
  return request({
    url: '/shift/doShift',
    method: 'get'
  })
}
