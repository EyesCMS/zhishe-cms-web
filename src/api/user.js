import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function register(data) {
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
    params: data
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
  return request({
    url: '/users/password',
    method: 'put',
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
    url: '/users/info',
    method: 'put',
    data
  })
}

export function uploadAvatar(data) {
  return request({
    url: '/users/avatar',
    method: 'post',
    data
  })
}

export function updatePassword(data) {
  return request({
    url: '/auth/password',
    method: 'post',
    data
  })
}
// GET /auth/authCode
export function getAuthCode(data) {
  return request({
    url: '/auth/authCode',
    method: 'get',
    params: data
  })
}
