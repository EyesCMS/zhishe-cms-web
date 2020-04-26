
import request from '@/utils/request'

export function getAllInvitationList(queryInfo) {
  return request({
    url: `/forum/posts`,
    method: 'get',
    params: queryInfo
  })
}

export function getInvitationList(clubid, queryInfo) {
  return request({
    url: `/forum/${clubid}/posts`,
    method: 'get',
    params: queryInfo
  })
}

export function getAllInvitationDetail(id, queryInfo) {
  return request({
    url: `/forum/posts/${id}`,
    method: 'get',
    params: queryInfo
  })
}

export function getInvitationDetail(id, queryInfo) {
  return request({
    url: `/forum/posts/${id}`,
    method: 'get',
    params: queryInfo
  })
}

