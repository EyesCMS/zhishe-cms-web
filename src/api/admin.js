import request from '@/utils/request'

export function getUnaudited(params) {
  return request({
    url: `/admin/unaudited`,
    method: 'get'
  })
}

export function getNewUser(params) {
  return request({
    url: `/admin/newusers`,
    method: 'get',
    params: params
  })
}

export function getClubSpecie(params) {
  return request({
    url: `/admin/clubspecies`,
    method: 'get'
  })
}
