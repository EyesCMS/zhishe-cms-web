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

export function question() {
  return request({
    url: '/users/username/question',
    method: 'get'
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
    url: '/users/newpassword',
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

