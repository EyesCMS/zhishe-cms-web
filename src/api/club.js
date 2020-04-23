import request from '@/utils/request'

export function getMemberList(query) {
  return request({
    url: '/club/:club/members',
    method: 'get',
    params: { query }
  })
}

export function getMemberDetail(query) {
  return request({
    url: '/clubs/:club/members/:userid',
    method: 'get',
    params: { query }
  })
}
