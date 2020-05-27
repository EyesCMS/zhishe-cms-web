import request from '@/utils/request'

export function getUnauditedData(params) {
  return request({
    url: `/admin/unaudited`,
    method: 'get'
  })
}

export function getNewUserData(params) {
  return request({
    url: `/admin/newusers`,
    method: 'get',
    params: params
  })
}

export function getClubSpecieData(params) {
  return request({
    url: `/admin/clubspecies`,
    method: 'get'
  })
}
