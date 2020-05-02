import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function register(data) {
  console.log(data)
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

export function question(data) {
  return request({
    url: '/users/question',
    method: 'get',
    data
  })
}

export function answer(data) {
  console.log(data)
  return request({
    url: '/users/answer',
    method: 'post',
    data
  })
}

export function newpassword(data) {
  console.log(data)
  return request({
    url: '/users/password',
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

export function submitProfile(data) {
  return request({
    url: '/user/info',
    method: 'put',
    data
  })
}
