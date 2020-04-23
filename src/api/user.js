import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function getMemberList(query) {
  return request({
    url: '/auth/members',
    method: 'get',
    params: { query }
  })
}

export function getMemberDetail(query) {
  return request({
    url: '/auth/details',
    method: 'get',
    params: { query }
  })
}
