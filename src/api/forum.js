
import request from '@/utils/request'

export function getInvitationList(clubid, queryInfo) {
  return request({
    url: `/forum/${clubid}/posts`,
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

