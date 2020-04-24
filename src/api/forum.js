
import request from '@/utils/request'

export function getInvitationList(clubid) {
  return request({
    url: `/forum/${clubid}/posts`,
    method: 'get'
  })
}
